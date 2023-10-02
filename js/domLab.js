const menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
      {text: 'all', href: '/catalog/all'},
      {text: 'top selling', href: '/catalog/top'},
      {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#' , subLinks: [
      {text: 'new', href: '/orders/new'},
      {text: 'pending', href: '/orders/pending'},
      {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
      {text: 'profile', href: '/account/profile'},
      {text: 'sign out', href: '/account/signout'},
    ]},
];
const mainEl = document.querySelector('main');
  
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = '<h1>SEI Rocks!</h1>';
mainEl.setAttribute('class' , 'flex-ctr');
  
const topMenuEl = document.getElementById('top-menu');
  
topMenuEl.style.height = '100%';
topMenuEl.setAttribute('class' , 'flex-around');
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
  
for (let link of menuLinks) {
    newEl = document.createElement('a');
    newEl.setAttribute('href' , link.href);
    newEl.textContent = link.text;
    topMenuEl.appendChild(newEl);
} 

// DOM PT 2
const subMenuEl = document.getElementById('sub-menu');

subMenuEl.style.height = '100%';
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.setAttribute('class' , 'flex-around');
subMenuEl.style.position ='absolute';
subMenuEl.style.top = '0';

const topMenuLinks = document.querySelectorAll('#top-menu a');
let showingSubMenu = false;

topMenuEl.addEventListener('click', function(evt) {
    evt.preventDefault();
    const link = evt.target;
    if (link.tagName !== 'A') return;
    console.log(link.textContent);

    if (link.classList.contains('active')) {
        link.classList.remove('active');
        showingSubMenu = false;
        subMenuEl.style.top = '0';
        return;
    }

    topMenuLinks.forEach(function(link){
        link.classList.remove('active');
    });
    
    link.classList.add('active');

    const linkData = menuLinks.find(function(obj){
        return obj.text === link.textContent;
    });
    showingSubMenu = 'subLinks' in linkData;

    if (showingSubMenu === true) {
        buildSubMenu(linkData.subLinks);
        subMenuEl.style.top = '100%';
    } else {
        subMenuEl.style.top = '0';
        mainEl.innerHTML = '<h1>about</h1>';
    }    
});

function buildSubMenu(subLinks) {
    subMenuEl.innerHTML = '';
    subLinks.forEach(function(link) {
        const linkEl = document.createElement('a');
        linkEl.setAttribute('href' , link.href);
        linkEl.textContent = link.text;
        subMenuEl.appendChild(linkEl);
    }
)};

subMenuEl.addEventListener('click' , function(evt) {
    evt.preventDefault();
    const link = evt.target;
    if (link.tagName !== 'A') return;
    console.log(link.textContent);

    showingSubMenu = false;
    subMenuEl.style.top = '0';

    topMenuLinks.forEach(function(link) {
        link.classList.remove('active');
    });
    mainEl.innerHTML = `<h1>${link.textContent}</h1>`;
});

