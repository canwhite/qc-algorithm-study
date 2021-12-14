/*
堆排序
因为堆的高度小于层高
也就是log以2为底，n的对数
所以插入一个数据最多步数也就是层数
O(logn)，也就是每轮调整的步数就是层数
然后一共有n轮
所以总体的时间就是O(nlogn)

步骤方法：
1.大顶堆调整（Max-Heapify），将堆的末端子节点做调整，使得子节点永远小于父节点；
2.创建大顶堆（Build-Max-Heap），将堆中所有数据调整位置，使其成为大顶堆；
3.堆排序（Heap-Sort），移除在堆顶的根节点，并做大顶堆调整的迭代运算。

*/

//因为声明的多个函数都需要数据长度，所以把Len设置为全局变量



//堆调整
function heapify(arr,i){


}

function swap(arr,i,j){


}

//创建大顶堆，依赖于以上两者
function buildMaxHeap(arr){


}

//排序,从堆中一个个取，取完调整，再取
function heapSort(arr){


}







