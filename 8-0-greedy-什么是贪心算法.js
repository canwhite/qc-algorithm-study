/*==================================================
1.贪心是什么？

贪心的本质是选择每一阶段的局部最优，从而达到全局最优。
这么说有点抽象，来举一个例子：
例如:
------------------------------------------
有一堆钞票，你可以拿走十张，
如果想达到最大的金额，你要怎么拿？
指定每次拿最大的，最终结果就是拿走最大数额的钱。
每次拿最大的就是局部最优，
最后拿走最大数额的钱就是推出全局最优。
------------------------------------------
再举一个例子如果是 有一堆盒子，
你有一个背包体积为n，
如何把背包尽可能装满，如果还每次选最大的盒子，就不行了。
这时候就需要动态规划。
动态规划的问题在下一个系列会详细讲解。

====================================================

2.什么时候用贪心？

一般数学证明，
* 数学归纳法
* 反证法
如果一个问题举不出反例，那就试一试贪心吧
说白了就是常识性推导加上举反例。

当然贪心也有自己的特征，就是一个问题，可以分成许多
子问题，然后求最优解，
局部最优，推出全局最优，并且举不出反例，这种情况可以选择贪心算法
就像上边的局部选择最大钞票，全局就能得到最优解，符合常事且举不出反例
这就可以用贪心算法
===================================================

3.贪心的一般解题步骤

贪心算法一般分为如下四步：
* 将问题分解为若干个子问题
* 找出适合的贪心策略
* 求解每一个子问题的最优解
* 将局部最优解堆叠为全局最优解

=================================================*/