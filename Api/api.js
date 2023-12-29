/*--------------------------
     for spinner loading
----------------------------*/
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
 }
 /*------------------------
    display books
 --------------------------*/
 const togglesearchResult = displayStyle => {
    document.getElementById('book-details').style.display = displayStyle;
 }
 
 /*------------------------
    serach result Count
 --------------------------*/
 const toggleSearchCount = displayStyle => {
    document.getElementById('books-count').style.display = displayStyle;
 }
 
 /*---------------------
       for error sms
 ----------------------*/
 const toggleSearchError = displayStyle => {
    document.getElementById('Error-sms').style.display = displayStyle;
 }
 
 /*---------------------
       for error sms
 ----------------------*/
 const toggleSearchErrorEmpyt = displayStyle => {
    document.getElementById('emptys').style.display = displayStyle;
 }
 /*--------------------------
        search book
 -----------------------------*/
 const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    /*------------------------
         display spinner
    --------------------------*/
    toggleSpinner('block');
    togglesearchResult('none');
    toggleSearchCount('none');
    toggleSearchError('none');
    searchField.value='';
 
        if(searchText === ''){
          toggleSearchErrorEmpyt('block');
          toggleSpinner('none');
     }
 
    else{
          toggleSearchErrorEmpyt('none')
          const url=`https://openlibrary.org/search.json?q=${searchText}`;
 
          fetch(url)
          .then(res=>res.json())
          .then(data=>diplaySearchResult(data.docs));
 
       }
 }
 
 
 /*------------------------------
       collection all books
 ---------------------------------*/
 const diplaySearchResult = books => {
 
  if(books.length === 0){
    toggleSearchError('block');
    toggleSpinner('none');
 
  }
  else{
     const bookCount = document.getElementById('books-count');
    
       bookCount.innerHTML =`
       <p>About ${books.length} results</p>
       `;
     toggleSpinner('block');
   
    const displayResult = document.getElementById('book-details');
    displayResult.textContent = '';
  
    books.forEach(book => {
 /*-------------------------
       book image
 --------------------------*/
  const url=` https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
 /*--------------------------
       books information
   -------------------------*/
       const div=document.createElement('div');
       div.classList.add('col');
       div.innerHTML=`
       <div class="col">
       <div class="card ">
       <img src="${url}" class="card-img-top" alt="...">
           <div class="card-body">
           <h4 class="card-title">Title: ${book.title}</h4>
           <h5 class="card-text">Author_name: ${book.author_name? book.author_name: 'Not available'}</h5>
           <h6>First_publish_year: ${book.first_publish_year? book.first_publish_year: 'Not available'}</h6>
         </div>
       </div>
       `;
      displayResult.appendChild(div);
      toggleSpinner('none');
      togglesearchResult('grid')
      toggleSearchCount('block');
      toggleSearchErrorEmpyt('none');
    
    })
 }
 }
 