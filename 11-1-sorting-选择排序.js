/*--------------------------------------------------------------------------------
每次一个子循环，把小的数字往前放
1. 在一个长度为 N 的无序数组中，第一次遍历 n-1 个数找到最小的和第一个数交换。
2. 第二次从下一个数开始遍历 n-2 个数，找到最小的数和第二个数交换。
3. 重复以上操作直到第 n-1 次遍历最小的数和第 n-1 个数交换，排序完成。
--------
选择排序的时间复杂度很清楚就是O(n^2)

---------------------------------------------------------------------------------*/
//for循环主要注意的是开闭
function selectionSort(arr){
	var len = arr.length;
	var minIndex,temp;
	//像这种左右边界，可以考虑开闭原则，
	//右边是开的，因为j可以直接+1取到
	//所以i< len-1,不取到最后一个数据
	for(let i = 0; i< len-1; i++){
		minIndex = i;
		//因为要遍历n-1，个数，从1开始，so这里可以取到len开，最后一个数
		//这里就是比对找最小下标
		for(var j= i+1;j<len;j++){
			if(arr[j] < arr[minIndex]){
				minIndex = j;
			}
		}
		//将当前数据和minIndex的数据做置换
		temp = arr[i];
		arr[i]  = arr[minIndex];
		arr[minIndex] = temp;
	}	
	return arr;
}


let result =  selectionSort([1,3,5,23,123,3]);
console.log("--result--",result);







