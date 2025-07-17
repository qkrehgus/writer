const signupmodal = document.getElementById("signup-modal");
const singupBtn = document.getElementById("signup-btn");

signupmodal.addEventListener('shown.bs.modal', () => {});



function initLocalStorage(){
    // users, posts
    // 로컬스토리지에 users와 posts가 없다면 json 형태로 만들어 준다
    if(localStorage.getItem('users'))(
        localStorage.setItem('users', JSON.stringify([]))
    )

    if(localStorage.getItem("posts"))(
        localStorage.setItem('posts', JSON.stringify([]))
    )
}

function handlesignup(){
    const usernameInputValue = document.getElementById("signup-username-input").value
    const passwordInputValue = document.getElementById("signup-password-input").value

    const allusers =JSON.parse(localStorage.getItem('users'))
    // if(allusers.some(function(singleUser){

    // }))
    allusers.push({username: usernameInputValue, password: passwordInputValue})
    localStorage.setItem('users', JSON.stringify(allusers))



}

function handleLogin(){
    const loginusernameInputValue = document.getElementById("login-username-input").value
    const loginpasswordInputValue = document.getElementById("login-password-input").value

    const allusers =JSON.parse(localStorage.getItem('users'))
    const foundUser = allusers.find(function(singleUser){
        return singleUser.username == loginpasswordInputValue && singleUser.password == loginpasswordInputValue
    })

    if(foundUser){
        sessionStorage.setItem('loggedUser', loginusernameInputValue)
    } else{
        alert("아이디/비번 불일치")
    }

    //로그인 유저네임 인풋 결과 로그인 패스워드 인풋 값이 들어옴 (singleUser라는 파라미터 안에!)
    //find라는 기본 내장 js 함수를 통해서 찾을거임 무엇을? 로컬스토리지의 users에 똑같은 ㄱ값이 있는 지를
}
function logout() {
    sessionStorage.removeItem('loggedUser')
    alert('로그아웃이 되었습니다')
}

function handlepost(){
    //제목, 본문, 작성자, 시간, id
    const writerUsername = sessionStorage.getItem('loggedUser')
    const postTitleValue = document.getElementById('post-title-input').value
    const postContentValue = document.getElementById('post-content-input').value
    const allPosts = JSON.parse(localStorage.getItem('posts'))
    let n = 0
    allPosts.unshift({
        id: Date.now(),
        title: postTitleValue,
        content: postContentValue,
        writer: writerUsername,
        timestamp: Date.now()
    })
    localStorage.setItem('posts', JSON.stringify(allPosts))
    showAllPosts()
}

function showAllPosts(){
    const postList = document.getElementById('postList')
    const allPosts = JSON.parse(localStorage.getItem('posts'))
    
    postList.innerHTML = '';
    allPosts.forEach(function(singlePost){
        const listItem = document.createElement('li')
        listItem.classList = 'list-group-item'

        let postHtml = `
        <div class="d-flex justify-between align-items-center">
          <div>
          <h5>${singlePost.title}</h5>
          <small class="text-muted">글쓴이: ${singlePost.writer}</small>
          <div>
        </div>
        <p class="mt-2">${singlePost.content}</p>
    </div>`
    listItem.innerHTML = postHtml
    postList.appendChild(listItem)
    })



}
document.addEventListener("DOMContentLoaded", function(){
    initLocalStorage()
    showAllPosts()
})
