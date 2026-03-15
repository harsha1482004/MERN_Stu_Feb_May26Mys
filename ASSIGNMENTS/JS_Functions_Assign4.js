function getRoute(role,isLoggedIn){
    if(!isLoggedIn)
        return "/login";
    switch(role){
      case "admin":
        return "/admin";
      case "student":
        return "/student";
      case "college":
        return "/college";
      case "proctor":
        return "/proctor";
      default:
        return "/denied";  
    }
}
console.log("admin",true);