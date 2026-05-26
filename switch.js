// 全局数据存储
let caseData = [];
let cateData = [];

// 加载分类与案例数据
async function loadData(){
    const cRes = await fetch('./data/category.json');
    cateData = await cRes.json();
    const dRes = await fetch('./data/cases.json');
    caseData = await dRes.json();

    renderCategory();
    if(location.pathname.includes('case-lib.html')){
        renderTable();
    }else{
        renderCard();
    }
}

// 渲染分类标签
function renderCategory(){
    const wrap = document.getElementById('categoryWrap');
    if(!wrap) return;
    let html = `<div class="category-item active" onclick="filterCate('all')">全部</div>`;
    cateData.forEach(item=>{
        html += `<div class="category-item" onclick="filterCate('${item.name}')">${item.name}</div>`;
    })
    wrap.innerHTML = html;
}

// 卡片渲染-大众视图
function renderCard(list = caseData){
    const wrap = document.getElementById('cardList');
    let html = '';
    list.forEach(item=>{
        html += `
        <div class="card">
            <h3>${item.title}</h3>
            <div class="card-info">${item.date}｜${item.category}</div>
            <div class="card-desc">${item.summary}</div>
            <div class="card-desc"><strong>传播价值：</strong>${item.value}</div>
            <a class="card-link" href="${item.originUrl}" target="_blank">查看原文专题 →</a>
        </div>
        `
    })
    wrap.innerHTML = html;
}

// 表格渲染-案例库视图
function renderTable(list = caseData){
    const wrap = document.getElementById('caseTable');
    let html = '';
    list.forEach(item=>{
        html += `
        <tr>
            <td>${item.title}</td>
            <td>${item.category}</td>
            <td>${item.date}</td>
            <td>${item.value}</td>
            <td><a href="${item.originUrl}" target="_blank">打开专题</a></td>
        </tr>
        `
    })
    wrap.innerHTML = html;
}

// 分类筛选
function filterCate(name){
    let activeDom = document.querySelectorAll('.category-item');
    activeDom.forEach(d=>d.classList.remove('active'));
    event.target.classList.add('active');

    let filterList = name === 'all' ? caseData : caseData.filter(item=>item.category === name);
    if(location.pathname.includes('case-lib.html')){
        renderTable(filterList);
    }else{
        renderCard(filterList);
    }
}

// 搜索功能
function searchCase(){
    let key = document.getElementById('searchInput').value.trim().toLowerCase();
    let filterList = caseData.filter(item=>{
        return item.title.includes(key) || item.category.includes(key) || item.summary.includes(key) || item.value.includes(key);
    })
    if(location.pathname.includes('case-lib.html')){
        renderTable(filterList);
    }else{
        renderCard(filterList);
    }
}

// 双视图跳转切换
function switchView(type){
    if(type === 'public'){
        location.href = 'index.html';
    }else{
        location.href = 'case-lib.html';
    }
}

// 页面加载执行
window.onload = loadData;
