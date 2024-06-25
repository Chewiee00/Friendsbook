import { signUp, login, checkIfLoggedIn } from "./controllers/auth-controller.js";
import { userFindbyPost, userFindAll, checkAddStatus, addFriend, findFriends, findFriendrequest, acceptRequest, rejectRequest} from "./controllers/user-controller.js";
import { addPost, deletePost, postFindAll } from "./controllers/post-controller.js";


const setUpRoutes = (app) => {
  app.post("/signup", signUp);
  app.post("/login", login);
  app.post("/checkifloggedin", checkIfLoggedIn);
  app.post("/findByIdPOST", userFindbyPost);
  app.post("/addPost", addPost);
  app.post("/deletePost", deletePost);
  app.get("/userFindAll",userFindAll);
  app.post("/checkAddStatus",checkAddStatus);
  app.post("/addFriend",addFriend);
  app.get("/postFindAll",postFindAll);
  app.post("/findFriends", findFriends )
  app.post("/findFriendrequest", findFriendrequest )
  app.post("/acceptRequest", acceptRequest )
  app.post("/rejectRequest", rejectRequest )

}

export default setUpRoutes;