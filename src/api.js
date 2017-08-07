export function headers_one() {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "react-app-123");
  myHeaders.append("Content-Type", "application/json");

  return myHeaders;
}

export function get_posts() {
  fetch("http://localhost:5001/posts", {method: "GET", headers: headers_one()})
  .then(function(resp){
    resp.json().then(function(data){
      console.log(data);
    })
  })
}

export function get_post(_id) {
  fetch("http://localhost:5001/posts/" + _id, {method: "GET", headers: headers_one()})
  .then(function(resp){
    resp.json().then(function(data){
      console.log(data);
    })
  })
}

export function get_comment(_id) {
  fetch("http://localhost:5001/comments/" + _id, {method: "GET", headers: headers_one()})
  .then(function(resp){
    resp.json().then(function(data){
      console.log(data);
    })
  })
}
