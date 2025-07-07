// inject-header.js
fetch('header.html')
  .then(res => res.text())
  .then(data => {
    const headerContainer = document.createElement('div');
    headerContainer.innerHTML = data;
    document.body.prepend(headerContainer);
  });
