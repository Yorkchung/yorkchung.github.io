建立屬於自己的GameFi Dapp(1/7)
=======================

介紹GameFi以及如何建立自己的GameFi分散式應用程式
------------------------------

![](https://miro.medium.com/max/1400/0*aySwUyb8VAJRVvrA)**Web 3.0 World**

文章目錄
====

1.  前言
2.  GameFi介紹
3.  NFT是甚麼?
4.  Dapp是甚麼?
5.  GameFi風險
6.  專案發想
7.  專案架構
8.  系列文章目錄

1\. 前言
======

從2017年出現的迷戀貓(Crypto Kitties)開始，區塊鏈的遊戲應用逐漸盛行。迷戀貓是一個寵物收藏的概念，每隻迷戀貓都是獨一無二的NFT，玩家可以互相交易迷戀貓並收藏，而這樣的概念持續延伸到現在，發展出各式各樣的GameFi應用。隨著web 3.0 、metaverse的概念逐漸受到熱烈討論，玩遊戲不再只是娛樂消遣，而是賺錢的新方法，這個的方法便是透過NFT等區塊鏈技術建置的遊戲來賺錢。 遊戲產業本質上是虛擬的，許多遊戲角色和道具是虛擬世界中的資產，與數位化連結度很高，傳統遊戲的遊戲資產是保存在中心化的企業中，並沒有真正意義上的擁有角色和道具，透過區塊鏈我們可以證明角色的所有權，可以輕易帶走所有數位資產，甚至作為交易的一種商品。傳統的遊戲是我們花錢買遊戲體驗和服務，而花出去的錢並不會回到我們身上，但 GameFi 讓我們可以真正擁有資產，花錢不會只是一去不回。接下來的文章會介紹如何開發一個簡單的GameFi Dapp。

2\. GameFi介紹
============

> 甚麼是GameFi?

GameFi 的全名是 Game Finance，顧名思義是將遊戲和金融合而為一，最早是由 MixMarvel 的首席戰略官Mary Ma在2019年首次提出。在過往遊戲中，玩家會以金錢購買虛寶，但卻無法跨遊戲使虛寶有更高的價值，遊戲的所有權也多半掌握在遊戲項目方，藉由在遊戲中添加NFT等DeFi要素，玩家可以取得治理代幣或進行借貸質押，除了實現Play-to-Earn外，也使得玩家在遊戲中更有主導權。隨著虛擬貨幣及相關應用的蓬勃發展，GameFi的實踐也前景可期，期望藉由實作小型GameFi Dapp，為未來開發相關應用場域激發更多想像。

> GameFi如何賺錢?

![](https://miro.medium.com/max/1400/0*vfCNrG6DMfEgzsuF)

GameFi藉由將虛寶結合區塊鏈及DeFi等元素，使得玩家可以將擁有的虛寶進行交易，將其換成現實生活中可以花用的金錢。以知名區塊鏈遊戲Axie Infinity為例，是一個打造虛擬角色的遊戲，透過發行代幣、轉售、對戰等等的過程，培育更強的角色增加勝率，許多玩家藉由打造遊戲角色，並將角色升級後售出從中獲利，在遊戲中花費時間及金錢打造的虛寶，所有權不再是遊戲方持有，使 GameFi 可以實現Play-to-Earn。傳統遊戲其實也有透過玩遊戲賺錢的方式，許多人會努力經營自己遊戲，然後在其他論壇上販售自己的遊戲帳號，藉此獲得相應的報酬，但實際上這樣的方式非常危險，因為交易中經常會遇到詐騙等問題，缺乏信任的中間商是問題的主因，而透過區塊鏈，數位資產的所有權不再是保存在遊戲供應商那邊，而是由玩家自己保管，因為是保存在區塊鏈上，所以我們可以很輕易地進行數位資產轉移，並且所有交易紀錄都在區塊鏈上，不會有付錢後卻買不到遊戲角色和道具的問題。延續web 3.0 的概念，GameFi 是將遊戲的掌控權逐漸交移到玩家手上，實現遊戲自治的想法，玩家可以藉此延伸許多應用和玩法，對於遊戲供應商而言，經營模式就會有所改變，服務供應商可以發行並販售遊戲道具，透過收取手續費等方式來賺錢，隨著遊戲愈來愈紅，遊戲本身附加的NFT或虛擬代幣也會水漲船高。例如 [The sandbox](https://www.sandbox.game/tc/) 遊戲，玩家可以經營自己的土地，透過販售土地和道具來賺錢，隨著人氣攀升，遊戲附加的產品也隨之升高，許多大型企業也來購買土地，像是[Adidas](https://twitter.com/TheSandboxGame/status/1462871109821419523?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1462871109821419523%7Ctwgr%5E%7Ctwcon%5Es1_&ref_url=https%3A%2F%2Fwww.inside.com.tw%2Farticle%2F25678-adidas-originals-the-sandbox-144-parcel)。

![](https://miro.medium.com/max/1250/0*qT1DqVvd9Zy6Cy3L.png)[The sandbox](https://www.sandbox.game/tc/)

3\. NFT是甚麼?
===========

NFT是甚麼?為甚麼可以獨一無二? NFT是建立在智慧合約上的應用，全稱是 Non-FungibleToken（非同質化代幣），而我們平常所看到的代幣大部分都是同質化代幣，例如: BTC、ETH等。與同質化代幣不同，NFT彼此之間並不相同，因此可以做到獨一無二。

> 非同質化和同質化代幣差別?

舉例來說，我們使用台幣進行購買飲料，花了100元購買50元飲料，店員找回50元，每一張100元之間並無不同，價值可以拆分，可以分成2個50元，也可以代表10個10元，這就是同質化代幣。比如你手上的 1 個 BTC 和其他人手上的 1 個 BTC，它們是一樣的，錨定價值相等，可以隨意交換，也可以再進行拆分0.001個BTC。

而非同質化代幣不同，每個代幣都是獨特的，即便是在同一系統，NFT 都是單獨存在的，並且 NFT 不像 BTC 和 ETH 可以分割為 0.1 或者 0.0002。因此相當適合應用於數位資產、藝術品等等創造性的作品，使擁有者可以用以作為所有權的證明。目前較為廣泛的應用為 [OpenZeppelin](https://www.openzeppelin.com/) 所提供的 ERC-721 代幣合約標準。

> NFT智慧合約

剛剛提到NFT其實是智慧合約的一種應用，它是ERC-721的別名，類似的還有ERC-20、ERC-725等代幣標準。[ERC](https://eips.ethereum.org/erc)全名是 [Ethereum Request for Comment](https://eips.ethereum.org/erc) 的縮寫，ERC標準是以太坊上關於開發者協議的規範與合約標準。有點類似 [IETF ( 網際網路工程任務組 )](https://www.ietf.org/)所制定的TCP/IP標準協定。由於ERC標準是開源的，任何人都可以進行提案，或提出改善計畫，開發人員可以通過提交EIP，來向以太坊社群，提出新的ERC標準提案，提交的內容包括協議規範和合同標準。 一旦EIP得到以太坊委員會的批准並最終確定後，它將成為新的ERC，新的ERC提供了一套可以為以太坊開發人員實施的標準，開發人員可以使用這些標準來構建智能合約。由於安全性檢測等因素，目前NFT較為廣為應用的合約範本是使用[OpenZeppelin](https://docs.openzeppelin.com/contracts/2.x/api/token/erc721)提供的。

> NFT不可取代?

許多人都會探討 NFT 是可以取代的，最知名的就是 Elon Musk換上無聊猿的組圖。NFT其實是透過metadata的方式來指向網路資源，這些數位資產其實是很容易被複製的，複製的難度比現實中的物品低上許多。但，事實上 NFT的價值不是在於這些網路資產，這些網路資產只是 NFT 所附加的價值，NFT 真正的價值在於區塊鏈本身，在於發行的合約上面，透過 Dapp 等應用更能體現這樣的價值。在 NFT 合約上面，合約所發行的代幣都是獨一無二的，連帶所擁有的網路資產也是獨一無二的，舉例來說，在GameFi的遊戲上並不會出現完全一模一樣的道具。

![](https://miro.medium.com/max/1400/0*Dh6bSv92wl23-cSe.jpg)Elon Musk

4\. Dapp是甚麼?
============

Dapp全名為 「Decentralized Application 」，意旨藉由網站或手機應用程式，結合區塊鏈技術實作的相關應用，相比過往中心化應用，Dapp具備區塊鏈的特性。GameFi是一個實現Dapp很好的應用，傳統的遊戲，數據儲存在中心化的伺服器，所以遊戲開發商對於遊戲的絕對控制權，可在無人知道情況下，任意的修改遊戲規則與內容；但去中心化的遊戲，數據儲存在分佈式的網絡上，所有的規則皆公開透明，且無法篡改任何內容，而遊戲資產的所有權隸屬於玩家，開發商無權控制，Dapp會自動去抓取區塊鏈上的資料，不會透過第三方轉介，達到遊戲自治的理念。

在接下來的文章中，我們會介紹如何將遊戲規則寫入智慧合約，並將其用於打造Dapp。

5\. GameFi風險
============

說了這麼多好處，GameFi 真的沒有缺點嗎?跟許多DeFi一樣，其衍生出的經濟非常複雜，但也產生許多風險。目前GameFi市場尚未成熟，許多項目仍在試驗階段，多數參與者希望從中快速獲利，可能造成缺乏遊戲性而無法長遠經營，另外也有許多[項目方跑路(Rug Pull)](https://www.blocktempo.com/squid-game-rug-pull-token-crashes-developers-left-the-project/)、[無預警倒閉或下架](https://tw.news.yahoo.com/f1%E8%B3%BD%E8%BB%8A%E5%8D%80%E5%A1%8A%E9%8F%88%E9%81%8A%E6%88%B2%E7%AA%81%E7%84%B6%E4%B8%8B%E6%9E%B6-%E8%99%9B%E5%AF%B6%E5%83%B9%E5%80%BC%E6%9A%B4%E8%B7%8C-%E9%9D%A0gamefi%E8%B3%BA%E9%8C%A2%E8%83%8C%E5%BE%8C%E8%97%8F%E4%BB%80%E9%BA%BC%E9%A2%A8%E9%9A%AA-100459148.html?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAAH_R97kKLJ3b8mtS8r9HKoEeoIdbKq0e3WvVluwkrcjpWbVf4M0aU8N8oOh07UEHQAp50g2wsMeilXjmvzwhahgJ9IFk__w_IhUartJZHRIrQa_PhWzscKKpsp2MAR4hwa8MbCTItKuMAIDC1H-UgIX4JUIwZJKtqjXqwmwmfwr_)、[遭到駭客攻擊](https://blockcast.it/2022/04/12/after-ronin-hack-will-origin-save-axie-infinity/)等風險存在，GameFi仍在勃發展中，藉由多多了解項目方發展規劃、遊戲設計模型、當中的智慧合約是否安全等面向方能更加保障自身資產。

6\. 專案發想
========

這個專案是藉由打造一個GameFi 遊戲來介紹遊戲如何和區塊鏈結合。這個專案主要是由[King of the Ether](https://www.kingoftheether.com/thrones/kingoftheether/index.html)和地標遊戲兩概念相互結合，打造一個邊走邊玩邊賺錢的遊戲體驗。

> King of the Ether

King of the Ether 是一個可以藉由遊戲獲得名聲或是賺取以太幣的小遊戲，出價最高者可以當國王，名字將永遠被記錄在區塊鏈上，若遭到篡位，篡位者出價的部分金額將會補償給前任國王。

> struct King {
> 
> address addr;
> 
> uint amount;
> 
> string name;
> 
> uint createdAt;
> 
> }

> 地標類型遊戲

以[Ingress](https://zh.wikipedia.org/zh-tw/Ingress)為例，是一種結合GPS、佔領及防禦道具等要素使玩家陣營擁有地標的遊戲。

![](https://miro.medium.com/max/620/1*G1GTho58f1xa6grDhX63wQ.png)Ingress

> 專案遊戲規則

這個專案會結合以上兩個遊戲的部分概念進行發想，藉由將佔領及防禦道具轉換為NFT，使玩家在參與過程可以自行鑄造或購買NFT代幣來攻防地標塔。地標會記錄目前的生命、價值、擁有的NFT代幣，以及地標擁有者是誰。玩家可以根據不同NFT類型進行地標的操作，任何操作都會損失代幣，而代幣會儲存在地標塔中，公開顯示給所有玩家，所有人都可以對地標進行操作，當地標生命剛好歸零時(超過地標價值的攻擊算無效攻擊)，攻擊者將贏得地標塔上記錄的價值和所有的NFT代幣，並且地標會記錄最後一次當選地標擁有者的玩家名稱、攻擊時間和花費代幣，地標擁有者可以透過防禦來維持自己的地標所有權。

![](https://miro.medium.com/max/1400/1*V4o0854pn9oj5fuDvRnjfQ.png)Game flow![](https://miro.medium.com/max/1400/1*BA-FMr7yRJMO6SjCEoTPDw.png)GameFi

7\. 專案架構
========

這個專案會分成四個主要部分進行開發，在接下來的系列文章會進行介紹。第一個部分是區塊鏈的智慧合約，其中包含開發NFT的代幣合約，以及制訂遊戲規則的遊戲合約；第二個部分是開發android app，透過web3j的開源程式碼和區塊鏈上的智慧合約進行互動；第三個部分是建立遊戲後端的API伺服器，對於玩家進行身分驗證，儲存遊戲運行所需要的基本資訊，包含帳號名稱、所屬陣營、Hash的密碼、區塊鏈私鑰的加密金鑰(不是私鑰)等；而這些資料是儲存在第四個部分的MongoDB資料庫。做為測試用，NFT的網路資源是儲存在後端伺服器中，如果要固定NFT的metadata不可竄改，可以將metadata儲存在IPFS上。

![](https://miro.medium.com/max/1400/1*9bogk_6DkCm_QDzTCLdRdQ.png)專案架構圖

8\. 系列文章目錄
==========

文章會分成7個系列來介紹，分別針對用到的工具和方法進行介紹。文章目錄如下:

1.  [介紹GameFi以及如何部屬自己的GameFi](https://medium.com/gamefi-dapp-c840acd167c)
2.  [撰寫NFT合約](https://medium.com/e48b61a473bb)
3.  [撰寫遊戲合約](https://medium.com/8f6eedded3d0)
4.  android功能
5.  node.js API和MongoDB
6.  IPFS
7.  使用web3j呼叫智慧合約功能
