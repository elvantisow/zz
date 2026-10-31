const divisions=[
{name:"테니스 대회 본부",desc:"아마추어 테니스 대회 기획·운영",agents:["대회 기획","대회 운영","참가자 관리","규정·랭킹","대회 마케팅","스폰서십"]},
{name:"테니스 앱 개발 본부",desc:"테니스 매칭 앱 제품·개발·성장",agents:["프로덕트 오너(PO)","UI/UX 디자이너","프론트엔드 개발","백엔드 개발","매칭·랭킹 엔지니어","QA·보안","그로스·수익화"]},
{name:"간병인 사업 본부",desc:"경기 지역 간병인 소개·중개 운영",agents:["간병 운영","간병인 모집·검증","고객 상담","매칭 코디네이터","병원 제휴","정산·수익 관리","법률·품질 준수"]},
{name:"공통 지원 본부",desc:"전 사업 공통 관리·지원",agents:["법률·컴플라이언스","재무·회계","마케팅·SEO","디자인·콘텐츠","데이터·자동화"]}
];
const descriptions={
"CEO 총괄":"전체 사업 우선순위를 조정하고 본부별 결과물을 검토합니다.",
"대회 기획":"대회 콘셉트, 일정, 종목, 예산 및 운영안을 설계합니다.","대회 운영":"현장 운영, 코트 배정, 진행표와 돌발상황 대응을 관리합니다.","참가자 관리":"접수, 참가자 문의, 명단 및 공지 업무를 관리합니다.","규정·랭킹":"대회 규정, 경기 방식, 결과와 랭킹 기준을 관리합니다.","대회 마케팅":"참가자 모집 캠페인과 홍보 콘텐츠를 기획합니다.","스폰서십":"협찬 제안서, 후원 패키지와 파트너 관리를 담당합니다.",
"프로덕트 오너(PO)":"제품 요구사항, 우선순위, 로드맵과 릴리스를 관리합니다.","UI/UX 디자이너":"사용자 흐름, 화면 구조와 디자인 시스템을 설계합니다.","프론트엔드 개발":"웹·앱 사용자 인터페이스를 구현합니다.","백엔드 개발":"API, 데이터베이스와 서버 로직을 설계·구현합니다.","매칭·랭킹 엔지니어":"매칭 규칙, 추천 점수와 랭킹 로직을 설계합니다.","QA·보안":"테스트, 취약점 점검과 개인정보 보호를 검토합니다.","그로스·수익화":"활성화, 리텐션, 전환과 수익 모델을 분석합니다.",
"간병 운영":"의뢰 접수부터 배정·종료까지 운영 절차를 관리합니다.","간병인 모집·검증":"간병인 모집, 자격·경력 확인과 동의 이력을 관리합니다.","고객 상담":"환자·보호자 문의를 접수하고 상담 내용을 구조화합니다.","매칭 코디네이터":"조건에 맞는 간병인 후보를 추천하고 관리자의 승인을 지원합니다.","병원 제휴":"병원 및 관련 기관 제휴 업무를 지원합니다.","정산·수익 관리":"소개 수수료, 정산 내역과 미수금을 관리합니다.","법률·품질 준수":"직업소개업 요건, 개인정보와 서비스 품질 점검을 지원합니다.",
"법률·컴플라이언스":"사업별 계약, 규제와 개인정보 처리 기준을 검토합니다.","재무·회계":"예산, 비용, 매출과 현금흐름을 관리합니다.","마케팅·SEO":"브랜드 메시지, 검색 노출과 마케팅 전략을 수립합니다.","디자인·콘텐츠":"브랜드 디자인과 온·오프라인 콘텐츠를 제작합니다.","데이터·자동화":"운영 지표, 데이터 구조와 반복 업무 자동화를 설계합니다."
};
const all=[{name:"CEO 총괄 에이전트",division:"CEO",desc:descriptions["CEO 총괄"]},...divisions.flatMap(d=>d.agents.map(name=>({name,division:d.name,desc:descriptions[name]})))];
const $=s=>document.querySelector(s);
function renderDivisions(){$("#divisionCards").innerHTML=divisions.map(d=>`<article class="division" data-name="${d.name}"><h4>${d.name}</h4><p>${d.desc}</p><div class="count">전문 에이전트 ${d.agents.length}명 →</div></article>`).join("");$("#division").innerHTML=divisions.map(d=>`<option>${d.name}</option>`).join("");document.querySelectorAll(".division").forEach(x=>x.onclick=()=>{showTab("agents");$("#search").value=x.dataset.name;renderAgents()})}
function renderAgents(){const q=$("#search").value.toLowerCase();$("#agentList").innerHTML=all.filter(a=>(a.name+" "+a.division+" "+a.desc).toLowerCase().includes(q)).map(a=>`<div class="agent" data-agent="${a.name}"><div><b>${a.name}</b><small>${a.division}</small></div><em>상세 보기</em></div>`).join("")||'<p class="muted">검색 결과가 없습니다.</p>';document.querySelectorAll(".agent").forEach(el=>el.onclick=()=>{const a=all.find(x=>x.name===el.dataset.agent);$("#detailBody").innerHTML=`<h2>${a.name}</h2><div class="muted">${a.division}</div><p>${a.desc}</p><p>상태: 역할 정의 완료 · 실제 AI 실행 연결 전</p>`;$("#detail").showModal()})}
function showTab(id){document.querySelectorAll(".panel").forEach(p=>p.classList.toggle("hidden",p.id!==id));document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t.dataset.tab===id))}
document.querySelectorAll(".tab").forEach(t=>t.onclick=()=>showTab(t.dataset.tab));
$("#search").addEventListener("input",renderAgents);$("#close").onclick=()=>$("#detail").close();
renderDivisions();renderAgents();
let tasks=JSON.parse(localStorage.getItem("hq-tasks")||"[]");
function renderTasks(){$("#taskList").innerHTML=tasks.map(t=>`<article class="task"><b>${escapeHtml(t.title)}</b><p>${escapeHtml(t.desc)}</p><small>${escapeHtml(t.division)} · ${t.date}</small></article>`).join("")||'<p class="muted">등록된 업무가 없습니다.</p>'}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
$("#taskForm").onsubmit=e=>{e.preventDefault();tasks.unshift({title:$("#taskTitle").value,desc:$("#taskDesc").value,division:$("#division").value,date:new Date().toLocaleString("ko-KR")});localStorage.setItem("hq-tasks",JSON.stringify(tasks));e.target.reset();renderTasks();alert("기기에 업무가 저장되었습니다.")};renderTasks();
let deferred;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferred=e;$("#install").classList.remove("hidden")});$("#install").onclick=async()=>{if(deferred){deferred.prompt();await deferred.userChoice;deferred=null;$("#install").classList.add("hidden")}};
if("serviceWorker"in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));
