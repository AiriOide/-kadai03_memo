// リンクを保存する関数
function saveLinks(links) {
    localStorage.setItem('favoriteLinks', JSON.stringify(links));
}

// リンクを取得する関数
function getLinks() {
    const links = localStorage.getItem('favoriteLinks');
    return links ? JSON.parse(links) : [];
}

// リンクを表示する関数
function displayLinks() {
    const categoriesContainer = document.getElementById('categoriesContainer');
    categoriesContainer.innerHTML = '';
    const links = getLinks();
    const categories = {};

    links.forEach((link) => {
        if (!categories[link.category]) {
            categories[link.category] = [];
        }
        categories[link.category].push(link);
    });

    for (const [category, categoryLinks] of Object.entries(categories)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        categoryDiv.innerHTML = `<h2>${category || 'その他'}</h2>`;

        const linkList = document.createElement('ul');
        linkList.className = 'link-list';

        categoryLinks.forEach((link, index) => {
            const li = document.createElement('li');
            li.className = 'link-item';
            li.innerHTML = `
                <a href="${link.url}" target="_blank">${link.name}</a>
                <div class="button-group">
                    <button onclick="editLink(${index})">編集</button>
                    <button onclick="deleteLink(${index})">削除</button>
                </div>
            `;
            linkList.appendChild(li);
        });

        categoryDiv.appendChild(linkList);
        categoriesContainer.appendChild(categoryDiv);

        new Sortable(linkList, {
            animation: 150,
            onEnd: function() {
                updateLinksOrder();
            }
        });
    }
}

// リンクを追加する関数
function addLink(name, url, category) {
    const links = getLinks();
    links.push({ name, url, category });
    saveLinks(links);
    displayLinks();
}

// リンクを削除する関数
function deleteLink(index) {
    const links = getLinks();
    links.splice(index, 1);
    saveLinks(links);
    displayLinks();
}

// リンクを編集する関数
function editLink(index) {
    const links = getLinks();
    const link = links[index];
    const newName = prompt("新しいサイト名を入力してください:", link.name);
    const newUrl = prompt("新しいURLを入力してください:", link.url);
    const newCategory = prompt("新しいカテゴリを入力してください:", link.category);

    if (newName && newUrl) {
        links[index] = { name: newName, url: newUrl, category: newCategory };
        saveLinks(links);
        displayLinks();
    }
}

// リンクの順序を更新する関数
function updateLinksOrder() {
    const linkItems = document.querySelectorAll('.link-item');
    const links = getLinks();
    const newLinks = [];

    linkItems.forEach((item) => {
        const linkName = item.querySelector('a').textContent;
        const link = links.find(l => l.name === linkName);
        if (link) {
            newLinks.push(link);
        }
    });

    saveLinks(newLinks);
}

// 検索機能
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const linkItems = document.querySelectorAll('.link-item');

    linkItems.forEach((item) => {
        const linkName = item.querySelector('a').textContent.toLowerCase();
        if (linkName.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

// フォームの送信イベントを処理
document.getElementById('addLinkForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('linkName').value;
    const url = document.getElementById('linkUrl').value;
    const category = document.getElementById('linkCategory').value;
    addLink(name, url, category);
    this.reset();
});

// 初期表示
displayLinks();
const li = document.createElement('li');
li.className = 'link-item';
li.innerHTML = `
<a href="${link.url}" target="_blank">${link.name}</a>
<div class="button-group">
<button onclick="editLink(${index})">編集</button>
<button onclick="deleteLink(${index})">削除</button>
</div>
`;
