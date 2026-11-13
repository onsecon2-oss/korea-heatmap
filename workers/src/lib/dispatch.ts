/**
 * KOSPI 데이터 업데이트 트리거 (Cloudflare Cron -> GitHub Actions).
 *
 * GitHub Actions 자체 schedule(cron)은 지연/누락이 심해서(하루 8회 중 2회만 실행되는 날 다수)
 * 정확한 Cloudflare Cron 이 update.yml 을 workflow_dispatch 로 직접 실행시킨다.
 *
 * 필요 시크릿: GH_DISPATCH_TOKEN
 *   - onsecon2-oss 계정의 fine-grained PAT
 *   - Repository: onsecon2-oss/korea-heatmap 만 선택
 *   - Permission: Actions = Read and write
 *   - GitHub repo secret 으로 등록하면 deploy-api.yml 이 Worker secret 으로 동기화
 */
import type { Env } from "../types";
import { getActiveHolidaySet } from "./holidays";
import { isBusinessDay, todayKST, timeKST } from "./kst";

const REPO = "onsecon2-oss/korea-heatmap";
const WORKFLOW_FILE = "update.yml";

export async function triggerKospiUpdate(env: Env): Promise<{ ok: boolean; status?: number; reason?: string }> {
  const today = todayKST();
  if (!isBusinessDay(today, getActiveHolidaySet())) {
    console.log("[UPDATE-TRIGGER] skip: KRX holiday/weekend", today);
    return { ok: false, reason: "holiday" };
  }
  if (!env.GH_DISPATCH_TOKEN) {
    console.error("[UPDATE-TRIGGER] GH_DISPATCH_TOKEN secret is missing");
    return { ok: false, reason: "no_token" };
  }

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW_FILE}/dispatches`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.GH_DISPATCH_TOKEN}`,
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "koreaheatmap-cron",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ref: "main", inputs: { retry_count: "0" } }),
    },
  );

  if (res.status === 204) {
    console.log("[UPDATE-TRIGGER] dispatched", today, timeKST());
    return { ok: true, status: 204 };
  }
  const body = await res.text();
  console.error("[UPDATE-TRIGGER] dispatch failed", res.status, body.slice(0, 300));
  return { ok: false, status: res.status, reason: body.slice(0, 300) };
}
