# egret-swiper

#### 介紹
基于egret eui框架实现的模拟swiper卡片滑动效果。

#### 架構
以下是实现细节既然用到滑动，egret的eui库有scroll，game库有scrollview。这里用的是scroll。如果你用的是game库，可能有差异。



#### 安裝教程

1.  xxxx
2.  xxxx
3.  xxxx

#### 使用說明
主要的难点有2个，中间大两边小，两边遮挡。

中间大两边小：这里的333是我们项目的卡牌宽度，大家根据自己的实际情况修改。
这里有一点需要注意，当使用setChildIndex修改子物体的层级的时候，改的并不是zindex，在节点的位置会变，如果直接用getChildAt获取位置和实际看到的不一样 。所以在初始化的时候先便利一下保存在startchildren里。

