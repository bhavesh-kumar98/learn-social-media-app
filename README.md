**1. How to **deploy** on GitHub a **react** + **vite** app**

- i). Create a **Vite react** app
  ```bash
    npm create vite@latest
  ```
- ii). Create a new _repository_ on GitHub and _initialize GIT_
  ```bash
    git init
    git add .
    git commit -m "add: initial files"
    git branch -M main
    git remote add origin https://github.com/[USER]/[REPO_NAME]
    git push -u origin main
  ```
- iii). setup base in **vite.cofig**

  ```bash
    base: "/[GitHub-Repo-Name]/"
  ```

- iv). Create folder (../.github/workflows/deploy.yml)
  ```bash
    root-dir/.github/workflows/deploy.yml
  ```
- v). Add the bellow code in _deploy.yml_ file

  ```bash
    name: Deploy

    on:
      push:
        branches:
          - main

    jobs:
      build:
        name: Build
        runs-on: ubuntu-latest

        steps:
          - name: Checkout repo
            uses: actions/checkout@v2

          - name: Setup Node
            uses: actions/setup-node@v1
            with:
              node-version: 16

          - name: Install dependencies
            uses: bahmutov/npm-install@v1

          - name: Build project
            run: npm run build

          - name: Upload production-ready build files
            uses: actions/upload-artifact@v2
            with:
              name: production-files
              path: ./dist

      deploy:
        name: Deploy
        needs: build
        runs-on: ubuntu-latest
        if: github.ref == 'refs/heads/main'

        steps:
          - name: Download artifact
            uses: actions/download-artifact@v2
            with:
              name: production-files
              path: ./dist

          - name: Deploy to GitHub Pages
            uses: peaceiris/actions-gh-pages@v3
            with:
              github_token: ${{ secrets.GITHUB_TOKEN }}
              publish_dir: ./dist
  ```

- vi). Add, Commit and Push to GitHub
- vii). Active workflow (GitHub on webpage)

      ```bash
        Config > settings > Actions > General > Workflow permissions > "Read and Write permissions"

        Actions > failed deploy > re-run-job failed jobs

        Pages > gh-pages > save

      ```

**2. I learned.**

- create react app using vite
- project file **structure**
- file extension **.jsx**
- **export**/import, default/naming
- **dynamic** Component/content { using this }
- how to **create** Component and **export**
- how to **use** Component and **import**
- and how to **reuse** Component
- we use **'className'** instance of 'class'
- **nesting** comp.
- how to add **css** in React
- and last basic **Bootstrap**
- last but not least, create a ToDo app UI page

**3. I learned:**

- i). Fragments <>...</>
- ii). **Map** method
  ```bash
    {items.map( item => <li>{item}</li>)}
  ```
- iii). **key props**
  ```bash
    <div key={item.id}>...</div>
  ```
- iv). **Conditional Rendering**

- v). _Ternary opr_. **?:**, _logical opr_. **&&**

  ```bash
    con ? value1 : value2
    {items === 0 ? <h3> Con id true </h3> : null;}
    con && con
    {items === 0 && <h3> Con id true </h3>}

  ```

- vi). _passing_ Data Via **props**

  ```bash
    //APP.jsx
    let myData = [1,2,3];
    <HeaderComp myPropName={myData}></HeaderComp>
    <FooterComp myPropName={myData}></FooterComp>

    //HeaderComp.jsx
    //using destructuring method
    export default function HeaderComp({myPropName}) {
      return(<p>{myPropName[0]}</p>);
    }

    //FooterComp.jsx
    export default function FooterComp(prop) {
      return(<p>{prop.myPropName[0]}</p>);
    }
  ```

**4. CSS Modules**

- file ext.: **fileName.modules.css**
- ex: **NavComp.modules.css**

  ```bash
    //APP.jsx
    <HeaderComp></HeaderComp>
    <NavComp></NavComp>

    //NavComp.modules.css
    .navMenu { bg-c: blue;}
    .navBtn { bg-c: black;}

    //NavComp.jsx
    import styles from './NavComp.modules.css'

    export default function NavComp() {
      return(

              <p className={styles.navMenu}> this is color blue </p>
              <p className={styles.navBtn}> this is color black </p>
            );
      }
  ```

**5. I learned:**

- i). _Passing_ **Children**

  ```bash
    //App.jsx

    function App() {
      return (
        <>
          <Container>
            <h1>hello</h1>
            <Random />
          </Container>


          <Container>
            <Bsbtn></Bsbtn>
          </Container>


          <Random />

          <Container>
            <Random></Random>
            <p className="myClass">this is react app</p>
          </Container>

        </>
      );
    }

    //Container.jsx
    import styles from './Container.module.css'

    export default function Container(props) {
      return <div className={styles.divs}>
      {props.children}
      </div>;
    }

    //Container.module.css
    .divs {
      margin: 30px auto;
      width: 50%;
      border-radius: 20px;
      border: 2px solid black;
      padding: 30px;
      background-color: wheat;
    }

  ```

- ii). **Handling(can be fun't) Event & Passing Fun't/method/handle via pros**

  ```bash
    function App() {

      //Handle(onBtnClick) of event(onClick)

      const onBtnClick = (event) => {
        let targetVal = event.target.childNodes[0].data;
      };

      return (
        <div id="calculator" className={styles.calsi}>

          //passing by props(onBtnClickprops), defines funt(onBtnClick) in parent(App.jsx)
          // call by child(ButtonContainer)
          <ButtonContainer onBtnClickprops={onBtnClick}></ButtonContainer>
        </div>
      );
    }

    //ButtonContainer.jsx
    //passing handle via props(onBtnClickprops)
    export default function ButtonContainer({onBtnClickprops}) {
      const buttonsNames = ["C", "/", "*", "+", "1", "2", "3", "-", "4", "5", "6", ".", "7", "8", "9", "=", "0",];
      return (
        <div>
          {buttonsNames.map((buttonsName) => (
            <button
            //call(onBtnClickprops) by child
            onClick={onBtnClickprops}
            >
              {buttonsName}
            </button>
          ))}
        </div>
      );
    }
  ```

- iii). **Managing States, useState()**

  ```bash
    //first import the useState hook
    import { useState } from "react";

    function App() {
      //setup usestate: [current value, and method] = useState(initialValue)

      const [calVal, setCAlVal] = useState("");

      //handle, that assign the updated value to method(setCAlVal())
      const onBtnClick = (event) => {
        let targetVal = event.target.childNodes[0].data;
        if (targetVal === "C") {
          setCAlVal("");
        } else if (targetVal === "=") {
          const result = eval(calVal);
          setCAlVal(result);
        } else {
          const newDisplayVal = calVal + targetVal;

          //value update to the current value (calVal)
          setCAlVal(newDisplayVal);
        }
      };

      return (
        <div id="calculator" className={styles.calsi}>

          //pass updated value(current value)
          <Display displayVal={calVal}></Display>

          //event that pass event/value(targetVal)
          <ButtonContainer onBtnClick={onBtnClick}></ButtonContainer>
        </div>
      );
    }

    export default App;
    //ButtonContainer.jsx
    //passing handle via props(onBtnClickprops)
    export default function ButtonContainer({onBtnClickprops}) {
      const buttonsNames = ["C", "/", "*", "+", "1", "2", "3", "-", "4", "5", "6", ".", "7", "8", "9", "=", "0",];
      return (
        <div>
          {buttonsNames.map((buttonsName) => (
            <button
            //call(onBtnClickprops) by child
            onClick={onBtnClickprops}
            >
              {buttonsName}
            </button>
          ))}
        </div>
      );
    }
  ```

- iv). **Using Forms**

  ```bash
  //AddTodo.jsx
  export default function AddTodo({ onNewItem }) {
    const [todoName, setTodoName] = useState();
    const [todoDate, setTodoDate] = useState();

    const handleAddButtonClick = () => {
      //Add prevent to reload
      event.preventDefault();

      onNewItem(todoName, todoDate);
      setTodoName('');
      setTodoDate('');
    };
    return (
        <form className="row cRow"

          //Add this event with handler
          onSubmit={handleAddButtonClick}

          >
            <input
              type="text"
              placeholder="Enter Todo here"
              value={todoName}
              onChange={handleNameChange}
            />
            <input type="date" name="" id=""
              value={todoDate}
              onChange={handleDateChange}
            />
            <button
              type="submit"
              className="btn btn-success cBtn"
            >
              Add
            </button>
        </form>
    );
  }
  ```

**6. Use ref**

```bash

  //AddTodo.jsx
  import { useRef} from "react";

  export default function AddTodo({ onNewItem }) {

    //create ref
    const todoName = useRef();
    const todoDate = useRef();


    const handleAddButtonClick = (event) => {
      event.preventDefault();
      //access the current value
      const todoNameCurr =todoName.current.value;
      const todoDateCurr =todoDate.current.value;

      todoName.current.value = '';
      todoDate.current.value = '';

      //passing the curr value to props
      onNewItem(todoNameCurr, todoDateCurr);
    };
    return (
      <div className="container text-center">
        <form className="row cRow"
        onSubmit={handleAddButtonClick}>
          <div className="col-6">
            <input
              type="text"
              placeholder="Enter Todo here"

              //set ref value
              ref={todoName}

            />
          </div>
          <div className="col-4">
            <input type="date" name="" id=""

            //set ref value
            ref={todoDate}

            />
          </div>
          <div className="col-2">
            <button
              type="submit"
              className="btn btn-success cBtn"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
```

**7. Update state from Previous Sate:**

- i). _Spread_ Opr (...spread):-

  ```bash
    const handleNewItem = (itemName, itemDate) => {
    const newTodoItems = [
    { todoName: itemName, todoDate: itemDate },
    ...todoItems,
    ];
    setTodoItems(newTodoItems);
  };
  ```

- ii). _Functional_ Updates:-`

  ````bash
    const handleNewItem = (itemName, itemDate) => {

      setTodoItems((currValue) => [
            { todoName: itemName, todoDate: itemDate },
            ...currValue,
        ]);
      };
      ```
  ````

**8. Context API:**

- i). **create dir & file:**

  ```bash
    ./src/store/todo-items-store.jsx
  ```

- ii). **initialization:**

  ```bash
    //todo-items-store.jsx
    //for create
    import { createContext } from "react";

    export const TodoItemsContext = createContext({
      //values
      todoItems: [],
      addNewItem: () => {},
      deleteItem: () => {},
      });
  ```

- iii). **Provider:**

  ```bash
    //App.jsx

    import { TodoItemsContext } from "./store/todo-items-store";

    function App() {

      //this array(todoItems) are passed into todo-items-store.jsx as value

      const [todoItems, setTodoItems] = useState([]);

      //this fnt(addNewItem) are passed into todo-items-store.jsx as value

      const addNewItem = (itemName, itemDate) => {
        setTodoItems((currValue) => [
          { todoName: itemName, todoDate: itemDate },
          ...currValue,
        ]);
      };

      //this fnt(deleteItem) are passed into todo-items-store.jsx as value

      const deleteItem = (todoItemName) => {
        const updatedTodoItems = todoItems.filter(
          (item) => item.todoName !== todoItemName
        );
        setTodoItems(updatedTodoItems);
      };

      return (

        //we use Context Api by Provider and Value

        <TodoItemsContext.Provider
          value={{
            todoItems,
            addNewItem,
            deleteItem,
            }}>
          <center className="todo-container">
            <AppName></AppName>
            <AddTodo></AddTodo>
            <WelcomeMsg></WelcomeMsg>
            <TodoItems></TodoItems>
          </center>
        </TodoItemsContext.Provider>
      );
    }
    export default App;

  ```

- iv). **Access Value:**

  - _//AddTodo.jsx_

    ```bash
      //AddTodo.jsx


      // Access the Value by useContext
      import { useContext, useRef} from "react";

      import { TodoItemsContext } from "../store/todo-items-store";

      export default function AddTodo() {

        const todoName = useRef();
        const todoDate = useRef();

        // Access the Value by useContext
        const {addNewItem} = useContext(TodoItemsContext)

        const handleAddButtonClick = (event) => {
          event.preventDefault();
          const todoNameCurr =todoName.current.value;
          const todoDateCurr =todoDate.current.value;

          todoName.current.value = '';
          todoDate.current.value = '';

          //passed the context value(addNewItem)

          addNewItem(todoNameCurr, todoDateCurr);
        };

        return (
          <div className="container text-center">
            <form className="row cRow"
            onSubmit={handleAddButtonClick}>

              <div className="col-6">
                <input
                  type="text"
                  placeholder="Enter Todo here"
                  ref={todoName}
                />
              </div>

              <div className="col-4">
                <input type="date" name="" id=""
                ref={todoDate}
                />
              </div>

              <div className="col-2">

                <button
                  type="submit"
                  className="btn btn-success cBtn"
                >
                  Add
                </button>

              </div>

            </form>
          </div>
        );
      }
    ```

  - _//TodoItems.jsx_

    ```bash
      //TodoItems.jsx

      // use useContext for Access value
      import { useContext } from "react";
      import { TodoItemsContext } from "../store/todo-items-store";

      function TodoItems() {

        // Access the Value by useContext
        const {todoItems} = useContext(TodoItemsContext);

        return (
          <center className="todo-container">

            // passed here (todoItems)
            {todoItems.map((item) => (
              <TodoItem
                todoName={item.todoName}
                todoDate={item.todoDate}
              ></TodoItem>
            ))}
          </center>
        );
      }

      export default TodoItems;
    ```

  - _//TodoItem.jsx_

    ```bash
      //TodoItem.jsx

      // use useContext for Access value
      import { useContext } from "react";
      import { TodoItemsContext } from "../store/todo-items-store";

      function TodoItem({ todoName, todoDate }) {

        // access fnt value delbtn
        const { deleteItem } = useContext(TodoItemsContext);
        return (
          <div className="container">
            <div className="row cRow">
              <div key={todoName} className="col-6 cBold">
                {todoName}
              </div>
              <div className="col-4">{todoDate}</div>
              <div className="col-2">
                <button
                  type="button"
                  className="btn btn-danger cBtn"

                  //use here
                  onClick={() => deleteItem(todoName)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      }

      export default TodoItem;
    ```

**9. Use Reducer:**

- i). **initialization:**

  ```bash
    //todo-items-store.jsx

    //for create
    import {useReducer} from "react";

    const TodoItemsContextProvider = ({ children }) => {

    //1. initialization
    <!--  const [currStats, dispatch] = useReducer(reduser, initialStats) -->

      const [todoItems, dispatchTodoItems] = useReducer(todoItemsReducer, []);

      return (
        <TodoItemsContext.Provider
          value={{
            todoItems,
            addNewItem,
            deleteItem,
          }}
        >
          {children}
        </TodoItemsContext.Provider>
      );
    };

    export default TodoItemsContextProvider;
  ```

- ii). **Action Obj And Dispatch:**

  ```bash
    //todo-items-store.jsx

    //action and deispat
    const addNewItem = (itemName, itemDate) => {

      //define Action Obj{type(what happand or fnt) & payload(value)}

      const newItemsAction = {
        type: "NEW_ITEM",
        payload: {
          itemName,
          itemDate,
        },
      };

      //action dispatched using the dispatch fnt,
      //which invoke the  reducer
      dispatchTodoItems(newItemsAction);
    };

    const deleteItem = (todoName) => {
      //action obj
      const deleteItemAction = {
        type: "DELETE_ITEM",
        payload: {
          todoName,
        },
      };
      //dispatch fnt
      dispatchTodoItems(deleteItemAction);
    };
  ```

- iii). **Reducer fnt:**

  ```bash
    //todo-items-store.jsx

    //reducer fnt,
    //that takes current state(currTodoItems), action obj


    const todoItemsReducer = (currTodoItems, action) => {

      let newTodoItems = currTodoItems;
      if (action.type === "NEW_ITEM") {
        newTodoItems = [
          ...currTodoItems,
          { todoName: action.payload.itemName, todoDate: action.payload.itemDate },
        ];
      } else if (action.type === "DELETE_ITEM") {
        newTodoItems = currTodoItems.filter(
          (item) => item.todoName !== action.payload.todoName
        );
      }

      //return new state
      return newTodoItems;
    };
  ```

- iv). **All Together:**

      ```bash
      //todo-items-store.jsx

      <!-- 1. import reducer -->
      import { createContext, useReducer } from "react";

      export const TodoItemsContext = createContext({
        todoItems: [],
        addNewItem: () => {},
        deleteItem: () => {},
      });

      <!-- 4. create Reducer fnt -->
      const todoItemsReducer = (currTodoItems, action) => {
        let newTodoItems = currTodoItems;
        if (action.type === "NEW_ITEM") {
          newTodoItems = [
            ...currTodoItems,
            { todoName: action.payload.itemName, todoDate: action.payload.itemDate },
          ];
        } else if (action.type === "DELETE_ITEM") {
          newTodoItems = currTodoItems.filter(
            (item) => item.todoName !== action.payload.todoName
          );
        }
        return newTodoItems;
      };

      const TodoItemsContextProvider = ({ children }) => {

        <!-- 2. initialization -->
        const [todoItems, dispatchTodoItems] = useReducer(todoItemsReducer, []);

        <!-- 3. define Action Obj & Dispatch -->
        const addNewItem = (itemName, itemDate) => {
          const newItemsAction = {
            type: "NEW_ITEM",
            payload: {
              itemName,
              itemDate,
            },
          };
          dispatchTodoItems(newItemsAction);
        };

        const deleteItem = (todoName) => {
          const deleteItemAction = {
            type: "DELETE_ITEM",
            payload: {
              todoName,
            },
          };
          dispatchTodoItems(deleteItemAction);
        };

        return (
          <TodoItemsContext.Provider
            value={{
              todoItems,
              addNewItem,
              deleteItem,
            }}
          >
            {children}
          </TodoItemsContext.Provider>
        );
      };

      export default TodoItemsContextProvider;
      ```

<hr>
<hr>

**10. Social Media App:**

- **1. use State**
  <br>

  - Used **useState** to toggle sidebar menu.

    ```base
    1). const [selectedTab, setSelectedTab] = useState("Home");

    2). <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>

    3). onClick={() => { setSelectedTab("Home"); }}

    4). onClick={() => { setSelectedTab("CreatePost"); }}

    5). className={`nav-link text-white ${selectedTab === "CreatePost" && "active"}`}

    6). className={`nav-link text-white ${selectedTab === "Home" && "active"}`}

    7). {selectedTab === "Home" ? (<CreatePost></CreatePost>) : (<PostList></PostList>)}

    ```

    <hr>

- **2. Create store and createContext**
  <br>

  - Create a **store** and **createContext** to pass the values (values, fnts and methods) to all components (children).
    <br>
  - Create Component **PostListProvider** to access the children for **Clean UI** of _App.jsx_.

    ```base
    0). src\store\post-list-store.jsx

    1). import { createContext } from "react";

    2). export const PostListContext = createContext({postList: [], addPost: () => {}, deletePost: () => {},});

    3). const PostListProvider = ({ children }) => {
          const addPost = () => {};
          const deletePost = () => {};

          return (
            <PostListContext.Provider value={{postList, addPost, deletePost}}>
              {children}
            </PostListContext.Provider>
          );};
        export default PostListProvider;
    ```

    <hr>

- **3. Create State using useReducer**
  <br>

  - Create a **State** using **useReducer**, current value (postList) and _import_ by **useContext** into all components (children).
    <br>
  - **DispatchPostList** is used to pass action object (type, payload) to **Reducer** fnt (PostListReducer).
    <br>
  - **Reducer** fnt (PostListReducer) takes (currPostList, action) from **DispatchPostList** and **Return** **new state**.

    ```base

    1). import { useReducer } from "react";

    2). const postListReducer = (currPostList, action) => {
            if(action.type === "ADD_POST") { // logic with payload and currPostList}
            return currPostList;
            };

    3). const PostListProvider = ({ children }) => {

          const [postList, dispatchPostList] = useReducer(postListReducer, STATIC_POST_DATA);

            const addPost = () => {
              const addPostActionObj = {
                type: "ADD_POST",
                payload: {
                  value1,
                  value2,
                }
              };
              dispatchPostList(addPostActionObj);
            };

          return (
            <PostListContext.Provider value={{ postList, addPost, deletePost }}>
              {children}
            </PostListContext.Provider>
          );};
    ```

    <hr>

- **4. Pass OR import CurrState (postList) using useContext**
  <br>

  - **import** currState (**postList**) from **PostListContext** use by **useContext**
    <br>
  - **DispatchPostList** is used to pass action object (type, payload) to **Reducer** fnt (PostListReducer).
    <br>
  - **Reducer** fnt (PostListReducer) takes (currPostList, action) from **DispatchPostList** and **Return** **new state**.

    ```base

    1). <!-- PostList.jsx -->
        import { useContext } from "react";
        import { PostListContext } from "../store/post-list-store";

        const PostList = () => {

          <!-- Access currState "postList" -->

          const { postList } = useContext(PostListContext);

          return (<>

            <!-- use postList -->

              {postList.map((post) => (
                <Post key={post.id} post={post}></Post>
              ))}
            </>);};
        export default PostList;
    ```

    <hr>

- **5. Pass OR import addPost and deletePost using useContext**
  <br>

  - **import addPost** from **PostListContext** use by **useContext** into **CreatePost.jsx** component, use in _handleSubmit_ to get values using **useRef**, and pass all values (argument) by **addPost** fnt., after this _addPost_ fnt have a dispatcher _dispatchPostList_ that send action obj(type, payload) to reducer **postListReducer** that take currState and action and _return_ the new State (postList).
    <br>
  - **import deletePost** from **PostListContext** use by **useContext** into **Post.jsx** component. And pass in onClick fnt and _deletePost_ that take id **deletePost(post.id)**, And pass (argument) by **deletePost** fnt., after this _deletePost_ fnt have a dispatcher _dispatchPostList_ that send action obj(type, payload) to reducer **postListReducer** that take currState and action and _return_ the new State (postList).

    ```base

    1). <!-- CreatePost.jsx -->
        import { useContext, useRef } from "react";
        import { PostListContext } from "../store/post-list-store";

        const CreatePost = () => {

          const { addPost } = useContext(PostListContext);

          const userIdElem = useRef();

          const handleSubmit = (event) => {
            event.preventDefault();
            const userId = userIdElem.current.value;

            addPost(userId, postTitle, postBody, reactions, tags);
          };

          return (
            <form className="create-post" onSubmit={handleSubmit}>

              <div className="mb-3">
                <label htmlFor="userId" className="form-label">
                  Enter your User Id here
                </label>
                <input
                  type="text"
                  ref={userIdElem}
                  className="form-control"
                  id="userId"
                  placeholder="Your User Id"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>

            </form>);};

        export default CreatePost;

    2). <!-- post-list-store.jsx -->
        const addPost = (userId, postTitle, postBody, reactions, tags)  => {

        const addPostActionObj = {
          type: "ADD_POST",
          payload: {
            id: Date.now(),
            userId: userId,
            title: postTitle,
            body: postBody,
            tags: tags,
            reactions: reactions,
          },
        };
        dispatchPostList(addPostActionObj);
        };

        const deletePost = (postId) => {

        dispatchPostList({
          type: "DELETE_POST",
          payload: { postId },
        });};

        const postListReducer = (currPostList, action) => {

        let newPostList = currPostList;

        if (action.type === "DELETE_POST") {
          newPostList = currPostList.filter(
            (post) => post.id !== action.payload.postId
          );
        } else if (action.type === "ADD_POST") {
          newPostList = [action.payload, ...currPostList];
        }
        return newPostList;
        };

    3). <!-- Post.jsx -->
        import { useContext } from "react";
        import { PostListContext } from "../store/post-list-store";

        const Post = ({ post }) => {

          const { deletePost } = useContext(PostListContext);

          return (
            <div className="card post-card" style={{ width: "25rem" }}>
              <div className="card-body">
                <h6 className="card-title">{post.userId}</h6>
                <h5 className="card-title">
                  {post.title}
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"

                    onClick={() => deletePost(post.id)}
                  >
                    <MdDelete />
                  </span>
              </div>
            </div>);};

        export default Post;
    ```

<hr>

**11. Data Fetching using Fetch with Dummy API:**

```base
  <!-- PostList.jsx -->

  fetch("https://dummyjson.com/posts")
  .then((res) => res.json())
  .then((data) => console.log(data.posts));
```

<hr>

**12. The useEffect Hook:**

- This takes **Two Argument**

  - i). **1st Arg:** fnt/method + return
    - a). any Function/Method
    - b). return
  - ii). **2nd Arg:** [dependency Array] we use in _Three_ ways

    - a). _Empty Array:_ [] 
    - b). _Nothing:_ "Leave blank the 2nd Arg"
    - c). _Dependency Array:_ [data, value, fnt, method, anyList]

      ```base

      1). useEffect(
            <!-- 1st Arg with return -->
            () => {
            fetch("https://dummyjson.com/posts")
              .then((res) => res.json())
              .then((data) => {
                addInitialPosts(data.posts);
              });
            return () => {
              controller.abort();
            };},
          <!-- 2nd Arg dependency Array -->
          []);
      ```

      <br>

- **useEffect**

  ```base

  2). <!-- post-list-store.jsx -->
    useEffect(() => {
      const controller = new AbortController();
      const signal = controller.signal;
      fetch("https://dummyjson.com/posts", { signal })
        .then((res) => res.json())
        .then((data) => {
          addInitialPosts(data.posts);
        });
      return () => {
        controller.abort();
      };},
    []);
  ```

  <hr>
