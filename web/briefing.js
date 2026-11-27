(function(){
  function initBriefing(){
    var marketButton=document.getElementById('sm-open');
    var pulse=document.getElementById('market-pulse');
    var indexInfo=document.getElementById('index-info');
    if(!marketButton||!pulse||!indexInfo||document.getElementById('kh-briefing-open')) return;

    var style=document.createElement('style');
    style.textContent=".index-info{gap:20px}.market-pulse{padding-left:14px;padding-right:14px}.controls{gap:8px}.kh-briefing-open{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-width:126px;max-width:132px;padding:7px 9px;border:1px solid #a8e8bb;border-radius:10px;background:linear-gradient(135deg,#c8f6d5,#65b282);color:#102417;cursor:pointer;font-family:inherit;box-shadow:0 3px 14px rgba(101,178,130,.24);transition:transform .16s ease,box-shadow .16s ease,filter .16s ease;flex:0 0 auto}.kh-briefing-open:hover{transform:translateY(-2px);filter:brightness(1.04);box-shadow:0 6px 20px rgba(101,178,130,.38)}.kh-briefing-open:focus-visible{outline:3px solid #e1ffe9;outline-offset:2px}.kh-briefing-open svg{width:20px;height:20px;flex:0 0 auto}.kh-briefing-open-copy{display:flex;flex-direction:column;align-items:flex-start;line-height:1.15;white-space:nowrap}.kh-briefing-open-title{font-size:12px;font-weight:900;letter-spacing:-.03em}.kh-briefing-open-sub{font-size:9px;font-weight:600;opacity:.76;margin-top:3px}.kh-briefing-open-arrow{font-size:16px;font-weight:900;margin-left:auto}.kh-briefing-backdrop{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.68);display:none;justify-content:flex-end}.kh-briefing-backdrop.show{display:flex}.kh-briefing-panel{width:min(640px,100vw);height:100%;overflow:auto;background:#090b0a;border-left:1px solid #26332b;color:#e8e8e8;padding:20px 22px 28px;box-shadow:-12px 0 40px rgba(0,0,0,.35)}.kh-briefing-head{position:sticky;top:-20px;z-index:2;background:#090b0a;padding:16px 0 13px;border-bottom:1px solid #1f2922;display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.kh-briefing-title{font-size:20px;font-weight:800;letter-spacing:-.03em}.kh-briefing-asof{font-size:11px;color:#8a968e;margin-top:4px}.kh-briefing-close{background:#171c19;border:1px solid #2a352e;color:#d1d5db;border-radius:8px;font-size:20px;width:36px;height:36px;cursor:pointer}.kh-briefing-summary{font-size:13px;line-height:1.65;color:#d3d9d5;background:#0f1712;border-left:3px solid #65b282;padding:11px 13px;margin:14px 0}.kh-briefing-legend{font-size:10px;color:#8a968e;margin:0 0 12px}.kh-briefing-graph{border:1px solid #26352b;border-radius:12px;background:#0c120e;padding:14px;margin:12px 0 18px}.kh-briefing-graph-head{display:flex;justify-content:space-between;align-items:baseline;gap:10px;margin-bottom:8px}.kh-briefing-graph-title{font-size:13px;font-weight:800;color:#e6f0e9}.kh-briefing-graph-caption{font-size:10px;color:#849188}.kh-briefing-axis{display:grid;grid-template-columns:1fr 1fr 1fr;color:#748078;font-size:9px;margin:0 0 5px 104px;text-align:center}.kh-briefing-graph-row{display:grid;grid-template-columns:minmax(88px,96px) minmax(90px,1fr) auto;gap:10px;align-items:center;margin-top:9px}.kh-briefing-graph-name{font-size:11px;color:#cad4cd;line-height:1.25}.kh-briefing-track{height:12px;position:relative;display:grid;grid-template-columns:1fr 1fr 1fr;align-items:center}.kh-briefing-seg{height:5px}.kh-briefing-seg.left{background:rgba(196,112,112,.38);border-radius:5px 0 0 5px}.kh-briefing-seg.mid{background:rgba(165,174,168,.24)}.kh-briefing-seg.right{background:rgba(101,178,130,.4);border-radius:0 5px 5px 0}.kh-briefing-pin{position:absolute;top:50%;width:13px;height:13px;border-radius:50%;border:2px solid #0c120e;transform:translate(-50%,-50%)}.kh-briefing-pin.bearish{background:#df8585}.kh-briefing-pin.neutral{background:#c2ccc5}.kh-briefing-pin.bullish{background:#83d39c}.kh-briefing-graph-label{font-size:10px;font-weight:700;white-space:nowrap}.kh-briefing-graph-label.bearish{color:#e49a9a}.kh-briefing-graph-label.neutral{color:#bdc7c0}.kh-briefing-graph-label.bullish{color:#9bd2ad}.kh-briefing-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:10px}.kh-briefing-tile{border:1px solid #26332b;border-radius:10px;padding:13px;background:#0d100e;min-width:0}.kh-briefing-tile.bearish{background:rgba(125,50,50,.14);border-color:rgba(196,112,112,.34)}.kh-briefing-tile.bullish{background:rgba(45,110,70,.14);border-color:rgba(101,178,130,.34)}.kh-briefing-tile.neutral{background:rgba(120,130,125,.09)}.kh-briefing-tile-header{display:flex;justify-content:space-between;gap:8px;align-items:center;margin-bottom:8px}.kh-briefing-sector{font-size:13px;font-weight:700}.kh-briefing-sentiment{font-size:10px;font-weight:700;border-radius:20px;padding:3px 8px;white-space:nowrap}.bearish .kh-briefing-sentiment{color:#e49a9a;background:rgba(196,112,112,.14)}.bullish .kh-briefing-sentiment{color:#9bd2ad;background:rgba(101,178,130,.15)}.neutral .kh-briefing-sentiment{color:#c0c9c3;background:rgba(160,170,165,.12)}.kh-briefing-opinion{font-size:12px;line-height:1.55;color:#f4e5b6;background:rgba(225,179,65,.12);border:1px solid rgba(225,179,65,.26);border-left:3px solid #d9ad3e;border-radius:7px;padding:9px 11px;margin:0 0 12px}.kh-briefing-opinion:before{content:'시장 의견';display:block;color:#f0c950;font-size:10px;font-weight:800;margin-bottom:4px;letter-spacing:.02em}.kh-briefing-article{border-top:1px solid rgba(160,170,165,.16);padding-top:9px;margin-top:9px}.kh-briefing-link{color:#e5efe8;font-size:12px;line-height:1.45;font-weight:600;text-decoration:underline;text-decoration-color:#52665a;text-underline-offset:2px}.kh-briefing-date{font-size:10px;color:#839087;margin-top:3px}.kh-briefing-summary-text{font-size:11px;color:#b4beb7;line-height:1.55;margin:6px 0}.kh-briefing-article-opinion{font-size:11px;color:#f3e4b0;line-height:1.55;margin:7px 0;background:rgba(225,179,65,.1);border-left:3px solid #d9ad3e;border-radius:6px;padding:7px 9px}.kh-briefing-article-opinion:before{content:'기사 의견';display:block;color:#efc74e;font-size:10px;font-weight:800;margin-bottom:3px}.kh-briefing-empty{color:#9ca3af;text-align:center;padding:28px 10px;font-size:13px}.kh-briefing-note{font-size:10px;color:#78827b;margin-top:14px;line-height:1.5}@media(max-width:1280px){.kh-briefing-open{min-width:112px;max-width:116px;padding:6px 7px}.kh-briefing-open-sub{display:none}.index-info{gap:16px}.controls{gap:7px}}@media(max-width:700px){.kh-briefing-open{min-width:112px;max-width:116px;width:auto;height:36px;padding:6px 8px;gap:6px}.kh-briefing-open-sub,.kh-briefing-open-arrow{display:none}.kh-briefing-open-copy{display:flex}.kh-briefing-open-title{font-size:11px}.kh-briefing-open svg{width:17px;height:17px}.kh-briefing-axis{margin-left:0}.kh-briefing-graph-row{grid-template-columns:minmax(80px,1fr) auto;grid-template-rows:auto auto;gap:8px}.kh-briefing-graph-name{grid-column:1/2;grid-row:1}.kh-briefing-graph-label{grid-column:2/3;grid-row:1;justify-self:end}.kh-briefing-track{grid-column:1/3;grid-row:2}.kh-briefing-panel{padding:14px 14px 24px}.kh-briefing-head{top:-14px;padding-top:12px}.kh-briefing-grid{grid-template-columns:1fr}}";
    document.head.appendChild(style);

    var button=document.createElement('button');
    button.id='kh-briefing-open';button.type='button';button.className='kh-briefing-open';
    button.setAttribute('aria-label','오늘의 브리핑 열기: 기사 기반 섹터 전망');
    var icon=document.createElementNS('http://www.w3.org/2000/svg','svg');icon.setAttribute('viewBox','0 0 24 24');icon.setAttribute('fill','none');icon.setAttribute('stroke','currentColor');icon.setAttribute('stroke-width','1.8');icon.setAttribute('aria-hidden','true');
    var iconPath=document.createElementNS('http://www.w3.org/2000/svg','path');iconPath.setAttribute('d','M5 4.5h9l5 5v10H5z M14 4.5v5h5 M8 13h8 M8 16.5h6');iconPath.setAttribute('stroke-linecap','round');iconPath.setAttribute('stroke-linejoin','round');icon.appendChild(iconPath);
    var copy=document.createElement('span');copy.className='kh-briefing-open-copy';
    var buttonTitle=document.createElement('span');buttonTitle.className='kh-briefing-open-title';buttonTitle.textContent='오늘의 브리핑';
    var buttonSub=document.createElement('span');buttonSub.className='kh-briefing-open-sub';buttonSub.textContent='기사 기반 섹터 전망';copy.append(buttonTitle,buttonSub);
    var arrow=document.createElement('span');arrow.className='kh-briefing-open-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent='›';
    button.append(icon,copy,arrow);
    pulse.insertAdjacentElement('afterend',button);

    var backdrop=document.createElement('div');backdrop.className='kh-briefing-backdrop';backdrop.setAttribute('role','dialog');backdrop.setAttribute('aria-modal','true');backdrop.setAttribute('aria-label','오늘의 브리핑');
    var panel=document.createElement('section');panel.className='kh-briefing-panel';
    var head=document.createElement('header');head.className='kh-briefing-head';
    var heading=document.createElement('div');
    var title=document.createElement('div');title.className='kh-briefing-title';title.textContent='오늘의 브리핑';
    var asof=document.createElement('div');asof.className='kh-briefing-asof';asof.textContent='기사 기준 시각 확인 중';
    heading.append(title,asof);
    var close=document.createElement('button');close.type='button';close.className='kh-briefing-close';close.setAttribute('aria-label','닫기');close.textContent='×';
    head.append(heading,close);
    var content=document.createElement('div');content.className='kh-briefing-content';
    panel.append(head,content);backdrop.appendChild(panel);document.body.appendChild(backdrop);

    function closePanel(){backdrop.classList.remove('show');document.body.style.overflow='';button.focus();}
    function text(parent,tag,className,value){var el=document.createElement(tag);if(className)el.className=className;el.textContent=value||'';parent.appendChild(el);return el;}
    function renderGraph(sectors){
      var graph=document.createElement('section');graph.className='kh-briefing-graph';graph.setAttribute('aria-label','기사 기반 섹터 방향 그래프');
      var graphHead=document.createElement('div');graphHead.className='kh-briefing-graph-head';graph.appendChild(graphHead);
      text(graphHead,'div','kh-briefing-graph-title','기사로 본 섹터 방향');
      text(graphHead,'div','kh-briefing-graph-caption','정성적 의견 · 주가 등락 아님');
      var axis=document.createElement('div');axis.className='kh-briefing-axis';axis.innerHTML='<span>약세</span><span>중립</span><span>강세</span>';graph.appendChild(axis);
      sectors.forEach(function(sector){
        var sentiment=['bearish','bullish','neutral'].indexOf(sector.sentiment)>=0?sector.sentiment:'neutral';
        var row=document.createElement('div');row.className='kh-briefing-graph-row';graph.appendChild(row);
        text(row,'div','kh-briefing-graph-name',sector.name||'섹터');
        var track=document.createElement('div');track.className='kh-briefing-track';row.appendChild(track);
        ['left','mid','right'].forEach(function(side){var seg=document.createElement('i');seg.className='kh-briefing-seg '+side;track.appendChild(seg);});
        var pin=document.createElement('i');pin.className='kh-briefing-pin '+sentiment;pin.style.left=sentiment==='bearish'?'18%':sentiment==='bullish'?'82%':'50%';track.appendChild(pin);
        var label=sector.sentimentLabel||(sentiment==='bearish'?'약세 우위':sentiment==='bullish'?'강세 우위':'중립·관망');
        text(row,'span','kh-briefing-graph-label '+sentiment,label);
      });
      return graph;
    }
    function render(data){
      asof.textContent=data.asOf?(String(data.asOf).indexOf(data.date||'')===0?data.asOf:(data.date||'')+' · '+data.asOf):(data.date||'');
      content.replaceChildren();
      if(data.summary) text(content,'div','kh-briefing-summary',data.summary);
      text(content,'p','kh-briefing-legend','색상은 실제 주가 등락이 아니라 기사 근거로 해석한 섹터 전망입니다. 타일 크기는 기사 수나 시가총액을 뜻하지 않습니다.');
      var sectors=Array.isArray(data.sectors)?data.sectors:[];
      if(!sectors.length){text(content,'div','kh-briefing-empty','오늘 등록된 섹터 브리핑이 없습니다.');return;}
      content.appendChild(renderGraph(sectors));
      var grid=document.createElement('div');grid.className='kh-briefing-grid';content.appendChild(grid);
      sectors.forEach(function(sector){
        var sentiment=['bearish','bullish','neutral'].indexOf(sector.sentiment)>=0?sector.sentiment:'neutral';
        var tile=document.createElement('article');tile.className='kh-briefing-tile '+sentiment;grid.appendChild(tile);
        var tileHead=document.createElement('div');tileHead.className='kh-briefing-tile-header';tile.appendChild(tileHead);
        text(tileHead,'div','kh-briefing-sector',sector.name||'섹터');
        var sentimentLabel=sector.sentimentLabel||(sentiment==='bearish'?'약세 우위':sentiment==='bullish'?'강세 우위':'중립·관망');
        text(tileHead,'span','kh-briefing-sentiment',sentimentLabel);
        if(sector.opinion) text(tile,'p','kh-briefing-opinion',sector.opinion);
        (Array.isArray(sector.articles)?sector.articles:[]).forEach(function(article){
          var box=document.createElement('div');box.className='kh-briefing-article';tile.appendChild(box);
          var link=document.createElement('a');link.className='kh-briefing-link';link.textContent=article.title||'기사';
          try{var parsed=new URL(article.url,location.origin);if(parsed.protocol==='https:'){link.href=parsed.href;link.target='_blank';link.rel='noopener noreferrer';}else{link.removeAttribute('href');}}catch(e){link.removeAttribute('href');}
          box.appendChild(link);
          if(article.publishedAt) text(box,'div','kh-briefing-date',article.publishedAt);
          if(article.opinion) text(box,'div','kh-briefing-article-opinion',article.opinion);
          if(article.summary) text(box,'p','kh-briefing-summary-text',article.summary);
        });
      });
      text(content,'div','kh-briefing-note','기사 요약과 시장 의견은 정보 제공 목적입니다. 원문과 실제 시세를 함께 확인해 주세요.');
    }
    function load(){
      content.replaceChildren();text(content,'div','kh-briefing-empty','불러오는 중…');
      fetch('data/briefing.json?_='+Date.now(),{cache:'no-store'}).then(function(response){if(!response.ok)throw new Error('briefing unavailable');return response.json();}).then(render).catch(function(){content.replaceChildren();text(content,'div','kh-briefing-empty','브리핑 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');});
    }
    button.addEventListener('click',function(){backdrop.classList.add('show');document.body.style.overflow='hidden';load();close.focus();});
    close.addEventListener('click',closePanel);
    backdrop.addEventListener('click',function(event){if(event.target===backdrop)closePanel();});
    document.addEventListener('keydown',function(event){if(event.key==='Escape'&&backdrop.classList.contains('show'))closePanel();});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initBriefing);else initBriefing();
})();
