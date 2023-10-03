const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

class Node{
    constructor(data){
        this.data=data;
        this.left=null;
        this.right=null;
    }
}
class Tree{
    constructor(array){
        array=[...new Set(array)].sort((a,b)=>{return a-b})
        this.root=buildTree(array)
    }
}
function buildTree(array){
    if(array.length-1<0) return null;
    let mid=Math.round((array.length-1)/2)
    let node= new Node(array[mid])
    node.left=buildTree(array.slice(0,mid))
    node.right=buildTree(array.slice(mid+1))
    return node
}
function insertValue(root,value){
  if(root==null){
    root = new Node(value)
    return root
  }
  if(root.data>value){
    root.left=insertValue(root.left,value)
  }else{
    root.right=insertValue(root.right,value)
  }
  return root
}
function deleteValue(root,value){
  if(root===null){
    return root
  }
  if(root.data>value){
    root.left=deleteValue(root.left,value)
    return root
  }else if(root.data<value){
    root.right=deleteValue(root.right,value)
    return root
  }
  if(root.left===null){
    let temp=root.right;
    delete root
    return temp
  }else if(root.right===null){
    let temp=root.left;
    delete root
    return temp
  }else{
    let successorParent=root
    let successor=root.right
    while (successor.left!==null){
      successorParent=successor
      successor=successor.left
    }
      if(successorParent!=root){
        successorParent.left=successor.right
      }else{
        successorParent.right=successor.right
      }
      root.data=successor.data
      delete successor
      return root
  }
}
function find(root,value){
  if(root===null || root.data===value){
    return root
  }
  if(root.data>value){
    return find(root.left,value)
  }
  if(root.data<value){
    return find(root.right,value)
  }
  return null
}

function levelOrder(root,func){
  if(root===null) return ;
  let result=[]
  let queue=[]
  queue.push(root)
  while(queue.length!==0){
    let current=queue.shift()
    if(typeof func ==="function"){
      // function(node)
      func(current)
    }else{
      //return array instead
      result.push(current)
    }
    if(current.left!==null){
      queue.push(current.left)
    }
    if(current.right!==null){
      queue.push(current.right)
    }
  }
  if(typeof func!=="function"){
    return result
  }
}
function preorder(root,passed=[]){
  if(root===null) return;
  if(passed instanceof Function){
    passed(root)
  }else{
    passed.push(root.data)
  }
  preorder(root.left,passed)
  preorder(root.right,passed)
  if(typeof passed !=="function"){
    return passed
  }
}
function inorder(root,passed=[]){
  if(root===null) return;
  inorder(root.left,passed)
  if(passed instanceof Function){
    passed(root)
  }else{
    passed.push(root.data)
  }
  inorder(root.right,passed)
  if(typeof passed !=="function"){
    return passed
  }
}
function postorder(root,passed=[]){
  if(root===null) return;
  postorder(root.left,passed)
  postorder(root.right,passed)
  if(passed instanceof Function){
    passed(root)
  }else{
    passed.push(root.data)
    return passed
  }
}

function height(root){
  if(root==null) return 0;
  let leftHeight=height(root.left);
  let rightHeight=height(root.right);
  if(leftHeight>rightHeight){
    return leftHeight+1
  }else{
    return rightHeight+1
  }
}
function depth(root,value){
  if(root.data===value) return 0;
  if(root.data>value){
    return depth(root.left,value)+1
  }else{
    return depth(root.right,value)+1
  }
}
function isBalanced(root){
  if(Math.abs(height(root.right)-height(root.left))<=1){
    return true
  }else{
    return false
  }
}
function rebalance(root){
  let array=preorder(root)
  array=[...new Set(array)].sort((a,b)=>{return a-b})
  return buildTree(array)
}

function randomNumbers(){
  let array=Array.from({length: 10}, () => Math.floor(Math.random() * 40));
  return array
}

let testTree=new Tree(randomNumbers())
prettyPrint(testTree.root)
console.log(isBalanced(testTree.root))
console.log(levelOrder(testTree.root))
console.log(preorder(testTree.root))
console.log(inorder(testTree.root))
console.log(postorder(testTree.root))
insertValue(testTree.root,110)
insertValue(testTree.root,220)
insertValue(testTree.root,150)
console.log(isBalanced(testTree.root))
testTree.root=rebalance(testTree.root)
console.log(isBalanced(testTree.root))
console.log(levelOrder(testTree.root))
console.log(preorder(testTree.root))
console.log(inorder(testTree.root))
console.log(postorder(testTree.root))