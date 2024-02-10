const myLib = [];

AddBtn = document.getElementById('add')
AddBtn.addEventListener('click', () => {
    form_content = document.getElementById('form')
    dialog.showModal()
})

closeBtn = document.getElementById('close')
closeBtn.addEventListener('click', () => {
    dialog.close()
})


// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
//   this.info = () => {
//     console.log( `${title} by ${author}, ${pages} pages, ${read}`);
//   }
// }

class Book {
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
  
    info(){
        console.log( `${title} by ${author}, ${pages} pages, ${read}`);
    }
}

class probook extends Book {
    constructor(title, author, pages, read, price){
        super(title, author, pages, read);
        this.price = price;
    }
}

book = new probook('The Hobbit', 'J.R.R. Tolkien', 295, 'Not read', 20)

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    // book.info();
    myLib.push(book);
}


addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, 'Not read');
addBookToLibrary('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, 'Not read');
addBookToLibrary('The Two Towers', 'J.R.R. Tolkien', 352, 'Not read');
addBookToLibrary('The Return of the King', 'J.R.R. Tolkien', 416, 'Not read');

const submit = document.getElementById('submit')
submit.addEventListener('click', transferBookFromFormToLib)

function transferBookFromFormToLib(){
    var title = document.getElementById('newtitle')
    console.log(title.value)
    var author = document.getElementById('newauthor')
    var pages = document.getElementById('newpages')
    var read = document.getElementsByName('readstatus')
    
    let read_status = ''
    console.log(read)
    read.forEach(r => { if (r.checked) {read_status = r.value} })
    // console.log(read.length)
    // console.log(read[0].checked)


    addBookToLibrary(title.value, author.value, pages.value, read_status)
    displaybooks(myLib)
}



function displaybooks(myLib){
    const shelf = document.getElementById('bookshelf')
    shelf.innerHTML = ''
    for (var i of myLib){
        
        var newbook = document.createElement('div')
        newbook.id = i.title
        newbook.className = 'books'
        var book_title = document.createElement('h2')
        book_title.textContent = i.title
        var author = document.createElement('p')
        author.textContent = i.author
        var pages = document.createElement('p')
        pages.textContent = i.pages
        var read = document.createElement('p')
        read.textContent = i.read
        title_id = i.title
        
        
        
        var remove = document.createElement('button')
        remove.className = 'remove'
        remove.textContent = 'Remove'
        newbook.appendChild(book_title)
        newbook.appendChild(author)
        newbook.appendChild(pages)
        let options = ['Not read', 'Reading', 'Read']
        
        options.forEach((option) =>{
            let radio = document.createElement('input');
            let label = document.createElement('label');
            radio.type = 'radio';
            radio.name = title_id;
            radio.value = option;
            radio.id = title_id + "_" + option; // 为了避免id冲突，加上option
            label.htmlFor = radio.id;
            label.textContent = option;
            console.log('option',option)
            console.log('i.read',i.read)
            if(i.read === option) {
                console.log(i.read)
                console.log(option)
                radio.checked = true;
            }
            newbook.appendChild(radio);
            newbook.appendChild(label);
        
            // 这里使用了立即执行函数来正确绑定每本书的title
            (function(theTitle){
                radio.addEventListener('change', function(){
                    const index = myLib.findIndex(book => book.title === theTitle);
                    if(index !== -1) { // 确保找到了书籍
                        myLib[index].read = this.value;
                        console.log(myLib[index].read);
                        console.log(myLib);
                    }
                });
            })(i.title);
        });
        newbook.appendChild(document.createElement('br'));
        newbook.appendChild(remove)
        shelf.appendChild(newbook)
        
    }
    updateRemoveBtn()
}

// When the book shelf updated, we need to update the remove button event listener
function updateRemoveBtn(){
    const removeBtn = document.getElementsByClassName('remove')
    console.log(removeBtn[0])
    Array.from(removeBtn).forEach(btn => btn.addEventListener('click', removeBook))
}

displaybooks(myLib)

updateRemoveBtn()

function removeBook(){
    var bookId = this.parentElement.id
    console.log(bookId)
    const index = myLib.findIndex(book => book.title === bookId)
    console.log(index)
    myLib.splice(index, 1)
    console.log(myLib)
    displaybooks(myLib)
}
