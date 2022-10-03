建立屬於自己的GameFi Dapp(2/7)
=======================

撰寫NFT smart contract
--------------------

文章目錄
----

1.  環境設置
2.  建立NFT流程
3.  代幣合約介紹
4.  撰寫NFT smart contract
5.  測試及部屬NFT smart contract
6.  Opensea
7.  metadata
8.  大量產生NFT
9.  系列文章目錄

![](https://miro.medium.com/max/1400/1*8314n2SLdl5yoyVOXNd1og.jpeg)[Everydays: The First 5000 Days](https://onlineonly.christies.com/s/first-open-beeple/beeple-b-1981-1/112924)

2021 年 3 月名為「[Everydays: The First 5000 Days](https://opensea.io/assets/ethereum/0x2a46f2ffd99e19a89476e2f62270e0a35bbf0756/40913)」的NFT站上了佳士得的拍賣會會場，以6930 萬美元的價錢成交，賣給了新加坡的加密貨幣投資者 Vignesh Sundaresan，成為當時最貴的NFT (但在2022已被「[The Merge](https://opensea.io/collection/m)」超越)，可見NFT市場逐漸成長。「Everydays: The First 5000 Days」的原圖可以在[網路上](https://ipfsgateway.makersplace.com/ipfs/QmXkxpwAHCtDXbbZHUwqtFucG1RMS6T87vi1CdvadfL7qA)找到，大小是21,069 x 21,069 pixels，放大後可以看到這5000張圖的清晰照，它是儲存在IPFS上做永久保存，並且利用[智慧合約](https://opensea.io/assets/ethereum/0x2a46f2ffd99e19a89476e2f62270e0a35bbf0756/40913)發行NFT代幣。

1\. 環境設置
--------

> Remix IDE

Remix是solidity的開發工具，由以太坊基金會維護，有[網頁版](https://remix.ethereum.org/)、[桌面版](https://github.com/ethereum/remix-desktop/releases)，以及[VSCode擴充套件](https://marketplace.visualstudio.com/items?itemName=RemixProject.ethereum-remix)。

> Ganache

Ganache 可以幫我們快速建置 Ethereum 區塊鏈客戶端的環境，用於本地部署、開發、測試應用程式、測試程式碼等，我們在[這裡](https://trufflesuite.com/ganache/)找到如何安裝。

> Metamask

MetaMask是用於與以太坊區塊鏈進行互動的加密貨幣錢包，目前幾乎支援所有常用平台和瀏覽器，可以在瀏覽器的應用程式商店安裝metamask的套件，方便我們連接以太坊。

![](https://miro.medium.com/max/1400/1*uMGLMhmipP7oOce_JDEyPg.png)metamask

> python3

可以在[python官網下載](https://www.python.org/downloads/)python 3，建議不要安裝最新版，因為可能還不夠穩定。python用於最後大量產生圖片的部分。

2\. 建立NFT流程
-----------

要發行一個NFT其實很容易，目前許多平台都有提供代理發行NFT，例如: [Opensea](https://opensea.io/)，但是做為一個開發者，我們總會試著開發一個自己的NFT，從撰寫NFT智慧合約到實際可以看到畫面，其中的感動應該是很多程式開發者可以體會的。下面這張圖是開發一個NFT所需要的簡易流程，像Opensea這樣的平台通常會幫我們做好左邊的大圓圈，將所有需要用到程式開發的部分的處理完，而使用者通常只需要完成右邊的小圓圈。這個專案會教大家如何完成這些步驟，首先，我們完成從頭撰寫NFT合約，並且利用Remix來測試合約，然後發布到Ganache等測試環境，經過正常的合約檢測後，發佈到正式鏈，這時候NFT已經可以被正常鑄造和交易了，只是還未有數位資產和它掛勾，因此我們需要指定NFT的metadata是指向哪一個網路位置，綁定完成後我們就可以驗證這些數位資產的擁有者，並且賦予它們價值。

![](https://miro.medium.com/max/1400/1*zvLW8-HBn2IPxtvFLgsnIQ.png)建立NFT流程

3\. 代幣合約介紹
----------

從代幣合約這個名詞我們可以知道代幣其實是一種合約，由合約來制定發行的種類、數量、交易規則等，而這些合約有一個標準的規範，例如: ERC-20、ERC-721、ERC-777等等，ERC是 Ethereum Request for Comment 的縮寫，是以太坊上關於開發者協議的規範與合約標準，這些標準可以參考以太坊上的EIP提案([https://eips.ethereum.org/erc](https://eips.ethereum.org/erc))。

這個專案會用到的代幣是ERC-721，它是一個非同質化代幣，由於代幣的特性，我們可以在代幣上附加數位資產，讓資產可以獨一無二。智慧合約必須至少實作以下function，才可以被稱為ERC-721，[openzeppelin](https://docs.openzeppelin.com/contracts/4.x/erc721)有提供合約範本，我們可以直接使用這個範本來做為智慧合約的基礎架構，在這個基礎架構上建立自己的合約。

![](https://miro.medium.com/max/1400/1*Ox83c5NQ4UtDPEq3axsMiQ.png)ERC-721合約functions

4\. 撰寫NFT smart contract
------------------------

NFT的程式原始碼可以從我的[github上](https://github.com/Yorkchung/GameFi_Contract/blob/master/NFT/YORKMeta.sol)取得，以下是完整的程式碼，我會對比較重要且會用到的function進行說明，如果想要了解NFT其他的資訊可以參考[Nic的部落格](https://blog.niclin.tw/2022/02/01/nft-smart-contract-2/)。

> import openzeppelin

[OpenZeppelin](http://openzeppelin.com/) 是構建在 EVM 之上的開源智慧合約開發工具，讓開發者可以**安全地開發和管理智慧合約和 Dapp**。我們可以引入openzeppelin的ERC721程式碼來佈建我們的NFT合約，因為他們的合約已經被審計過相當多次，相對自行開發NFT合約較為安全。

![](https://miro.medium.com/max/1400/1*b9XsZfCa_pCMaRoqptL8yA.png)import openzeppelin

> 設置mint數量及價錢

我們可以設置這個NFT的最大總量及mint的價格，以及每個帳號可以挖的NFT數量。

![](https://miro.medium.com/max/1014/1*I1ssIerU234MAa1S2tBIvw.png)設置mint數量及價錢

> 設置URI

URI是metadata的外部連結，透過設置URI可以將NFT相關的數位資訊儲存在這個外部連結上。

![](https://miro.medium.com/max/950/1*DFUckisUCWR9rSzjUg80Sg.png)設置URI

> 紀錄交易歷史

因為遊戲合約需要抓取NFT的歷史交易紀錄，設置mapping的struct來儲存最後一次的交易。

![](https://miro.medium.com/max/1286/1*yYb1ugymF1aGnTnzRDWDQA.png)紀錄交易歷史

> 設置盲盒及交易的狀態

NFT在發行時可以預發售一個盲盒，並且設置一定時間後才能開啟盲盒，合約擁有者也可以設定這NFT是否開始mint。

![](https://miro.medium.com/max/1184/1*cLgaoGY-HrKwWxBuWHC7ew.png)設置盲盒及交易的狀態

> 設置mint價格

可以設置mint的價格，當去mint新的NFT時，就必須付出一定價格的手續費給合約擁有者。

![](https://miro.medium.com/max/1390/1*wDzgLRru7ERyLSbhfjUufw.png)設置mint價格

> 設置NFT 的URI

URI是Metadata的網路位置，如果將數位資訊存入智慧合約中是不切實際的，因為會消耗許多gas來儲存，因此衍生出metadata這樣的一個詞來代表資訊的起始值，我們可以從metadata找到關於這個NFT更多的資訊。在智慧合約中，我們可以設置盲盒的URI及實際NFT的URI，當尚未開啟盲盒之前，會連結到NotRevealed的URI，開啟後則會對應到BaseURI。

![](https://miro.medium.com/max/1400/1*JPN8zC-7EtnjAbDDZ20DrA.png)設置NFT 的URI

> 交易NFT

transferFrom()可以讓我們交易NFT，透過指定轉送對象和token ID的方式更換NFT的擁有者。

![](https://miro.medium.com/max/1400/1*Yg94cPe5DLSed9ZvVaU6QQ.png)交易NFT

5\. 測試及部屬NFT smart contract
---------------------------

我們使用Remix開發智慧合約，並用其測試合約功能是否能正常運行。在合約發布後可以看到下圖的這些函數，我們可以點擊flipReveal()、flipSaleActive()來關閉盲盒以及可以被mint，並且將mint的價格設定為0，方便測試使用。下面這張圖我們將mint的費用設為0，然後挖了五個NFT，可以看到我們的 balanceOf() 是5，代表有成功取得NFT。

![](https://miro.medium.com/max/914/1*ud0BckzDwwotLE1M7ngnFQ.png)Remix合約函數![](https://miro.medium.com/max/890/1*Dn_ivejqBWHDi80If0GYuA.png)Remix合約變數

在開發dapp相關應用時可以將合約佈署在ganache私有鏈當中，在開發過程及測試時會較為方便，當我們完成開發後，就可以將合約發布至公有鏈上。在Remix上可以選擇Ganache Provider連接自架的私有鏈，或者選擇metamask來連接公有鏈。

![](https://miro.medium.com/max/696/1*LnlJSI2KvbLoOs8LWlYxhg.png)執行環境![](https://miro.medium.com/max/1400/1*XbxzoUySIydxLu7R9Zhavg.png)Ganache合約運行結果

6\. Opensea
-----------

Rinkeby是以太坊公開的測試網，我們可以將智慧合約佈署到Rinkeby，並且Opensea也有提供[testnets](https://testnets.opensea.io/)來查看Rinkeby測試網上的NFT。當我們成功發布合約到Rinkeby並挖取NFT後，我們會看到Opensea上的testnets網站會出現我們所挖的NFT。

![](https://miro.medium.com/max/1400/1*EhYfKr_-WQHeBoSjbvCM1A.png)[https://testnets.opensea.io/account](https://testnets.opensea.io/account)

7\. metadata
------------

到目前已經完成合約的發布，可以成功獲取NFT，但在Opensea卻看不到任何圖片，原因是這些NFT是空的，我們**並未將任何數位資產綁定到NFT上**。如何綁定? **這時候就必須透過metadata來對NFT進行更詳細的說明**，[ethereum基金會](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md)對metadata更多的描述，簡而言之，我們必須用一個URL儲存metadata，並在其中的image屬性設置另一個URL來指向實際的圖片。我們可以查看知名的無聊猿NFT，並隨便點選其中一張NFT會發現在detail的部分有一個token ID，這是這個NFT在合約中的id，當我們點下id的連結會看下面這個json格式的資訊，這就是metadata，定義了NFT的附加資訊，包含圖片位置。

```
{  
"image":"ipfs://QmPoTaC23yXGhmFUfX7oqsmrPKTUR1ZCFgeEhoFsnLvca5",  
"attributes":  
    \[{  
     "trait\_type":"Name",  
     "value":"Mega Noise"  
    }\]  
}
```![](https://miro.medium.com/max/1400/1*qomAjOJ-pbclKk7N4actaw.png)無聊猿NFT![](https://miro.medium.com/max/1400/1*wNi6v2oyDzHp-siFH3O3IA.png)NFT Detail

metadata的流程如下，儲存在NFT合約中的資料只有metadata的URL，例如: [https://boredapeyachtclub.com/api/mutants/30003](https://boredapeyachtclub.com/api/mutants/30003)，而metadata的image放的是圖片位置，例如: ipfs://QmPoTaC23yXGhmFUfX7oqsmrPKTUR1ZCFgeEhoFsnLvca5。

![](https://miro.medium.com/max/1400/1*kKWOkGonNQfW1niTj5Yx-Q.png)metadata

因此，我們就可以來定義自己的metadata，內容如下:

```
{  
  "name": "YORK image 0",  
  "description": "attack nft",  
  "value":20,  
  "image": "[http://x.x.x.x/attack/0.jpg](http://10.0.2.2:3000/attack/0.jpg)"  
}
```

我的習慣是先在本地測試功能，才會發布到公開測試網上，因為區塊鏈是不可修改的，不論是以太坊或是IPFS，因此我會自行建立API server來存取metadata和image，並且**搭配ganache來測試**，後面文章會介紹如何發布到IPFS上。API的程式可以參考[這裡](https://github.com/Yorkchung/gamefi_api)。

8\. 大量產生NFT
-----------

到了資訊化的時代，圖像的產生更為容易，我們可以輕易的將圖片修改成各種梗圖，我們也可以利用程式的方式大量產生圖片。甚麼意思呢? 我們可以將圖片拆分不同部分，例如: 眼睛、鼻子、嘴吧、臉型等，利用排列組合的方式組合成各種圖片。這邊有一個很好用的工具提供給大家使用 -- [py-nft-generator](https://github.com/Yorkchung/py-nft-generator)，這個工具可以幫大家產生大量圖片，同時產生metadata，非常方便。

9\. 系列文章目錄
----------

文章會分成7個系列來介紹，分別針對用到的工具和方法進行介紹。文章目錄如下:

1.  [介紹GameFi以及如何部屬自己的GameFi](https://medium.com/gamefi-dapp-c840acd167c)
2.  [撰寫NFT合約](https://medium.com/e48b61a473bb)
3.  [撰寫地標合約](https://medium.com/8f6eedded3d0)
4.  android功能
5.  node.js API和MongoDB
6.  IPFS
7.  使用web3j呼叫智慧合約功能
