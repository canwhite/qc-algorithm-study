/*------------------------------------

英文名的由来：
Depth-First-Search
Breadth-First-Search

无论是深度优先查询还是广度优先查询，都是为了把tree打平，
主要区别是打平的方式不是很一样

深度优先查询：
主要是借助当前节点在for循环中调递归，
在横向中进行一个个纵向
横向是for循环
纵向是递归
遍历完整颗树完成树的查询



广度优先查询：
stack里放入当前节点node，
然后把所有子节点从当前节点拿出来放入栈的末尾
然后拿出当前node的兄弟节点，依次类推，直到取完


深度优先查询使用的是递归，广度优先查询用的是栈
------------------------------------*/