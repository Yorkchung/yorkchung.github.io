python 解析 PDF
=============

使用pdfplumber
------------

不知道大家在準備證照考試的時候，是否會看一些考古題，例如: Java OCP JP、CCNA等等，最近在看CEH的時候突發奇想，這些考古題難道不能做成像正式考試一樣來測驗嗎? pdf 要怎麼讀取呢，又不像文字檔可以直接讀檔。在查找相關資料後發現，python有一個很好用的套件，叫做pdfplumber ，可以很方便的處理PDF的問題，於是我寫了一個小小的project，能夠讀取PDF，並且隨機抽驗題目，並且產生報告。

> **這是我的專案架構圖**

![](https://miro.medium.com/max/1400/1*AnrKFT3K7R9q011-cJSh5w.png)專案架構

> **這是專案的資料夾**

```
|--pdf/  
|  |--你要讀取的PDF  
|--image/  
|  |--題目中會用到的圖片  
|--test/  
|  |--解析完PDF會將結果存在這  
|--report/  
|  |--測驗完產生的報告  
|--setup.py  
|--requirements.txt  
|--readpdf.py  
|--README.md
```

> **如何使用我的專案程式碼?**

專案程式碼: [**https://github.com/Yorkchung/CEH\_quiz**](https://github.com/Yorkchung/CEH_quiz)

1.  在執行專案前，必須先確定是否已經有安裝python，並且擁有pip的套件管理工具。不知道的人可以先去Google一下如何安裝。
2.  首先必須先行setup.py，指令如下:

```
\> python setup.py  
或是  
\> py setup.py  
或是  
雙擊執行 setup.py
```![](https://miro.medium.com/max/1400/1*zY36R32xmaCK6B50uuCWOg.png)setup.py

**同時，也會自動建立pdf、report、test這三個資料夾，然後我們把CEH10和CEH11的PDF放進去。**

![](https://miro.medium.com/max/1400/1*yuEaE8iQy1RV-YLweAg5Hw.png)建立資料夾

**pdf的部分要自己去考古題網站購買。**

![](https://miro.medium.com/max/1400/1*pjxk8zFcI_ZAQRZerZV_ww.png)pdf檔案

3\. 接著將題目會用到的圖片放入image的資料夾中，並且對應好CEH版本的資料夾，以及對應題號對圖片命名。

![](https://miro.medium.com/max/1400/1*LAtKQeRD23f8glC5UZHKUg.png)image

4\. 接著執行主程式，指令如下:

```
\> python readpdf.py  
或是  
\> py readpdf.py  
或是  
雙擊執行 readpdf.py
```![](https://miro.medium.com/max/1400/1*HIX0lM0o6rClSj4ca1F1ow.png)選擇版本![](https://miro.medium.com/max/1400/1*Gdsi9kvsPKp1F_5b937nOA.png)解析PDF

**主程式分為正式測驗和非正式，差別在於正式測驗不會告訴正確答案，而非正式會。**

![](https://miro.medium.com/max/1400/1*JB-v1Ij79-kiKGWYN2cFIQ.png)正式測驗![](https://miro.medium.com/max/1400/1*MCcWNzWFsmR-WLlZY4nyEQ.png)非正式測驗

**當測驗完的時候，會有總和對幾題和分數，以及統計所花費的時間。**

![](https://miro.medium.com/max/1400/1*jEdTD2FZvDATOJHF6sXPyA.png)分數

**最後也會產生報告，統計所有題目，這樣如果有問題就可以去PDF查找對應的題目。**

![](https://miro.medium.com/max/974/1*rc3JrmCtGkkZzdYSWL3tsQ.png)報告

**如果題目需要看圖，則會顯示這樣的字串，然後跳出圖片。**

![](https://miro.medium.com/max/540/1*ozSFrWimLh2Vg0JiuU_2Jg.png)題目包含圖片

> **程式碼解析**

這裡分為三個部分來講解:

1.  parser
2.  test
3.  report

**1\. parser**
--------------

```
pdffile=PDF\_dict\[version\]\['pdf'\]    #pdf檔路徑及檔名  
drop\_page = PDF\_dict\[version\]\['drop\_page'\]  
title\_line = PDF\_dict\[version\]\['title\_line'\]  
footer\_line = PDF\_dict\[version\]\['footer\_line'\]  
pdf = pdfplumber.open(pdf\_path+pdffile)  
total\_pages = len(pdf.pages)
```

**pdffile**是選擇要讀取的pdf版本，這裡是CEH的v10或v11。

**drop\_page**是前面幾頁沒有要讀取的，例如: 前面幾頁是目錄和封面頁。

**title\_line**是頁首。

**footer\_line**是頁尾，例如頁碼。

使用**pdfplumber.open**就可以讀取pdf成為一個物件。

**total\_pages**是pdf的總頁數。

可以在**PDF\_dict**中設定好所有參數，然後parser只要丟入選擇的版本就好。

```
PDF\_dict = {  
"v10":    
{"pdf":"Cehv10exam.pdf",  
"drop\_page":1,  
"title\_line":1,  
"footer\_line":1},  
"v11":  
{"pdf":"312-50v11.pdf",  
"drop\_page":2,  
"title\_line":1,  
"footer\_line":2}}
```

2\. test
--------

如果parer成功，則會在test資料夾中產生讀取題目的結果。

![](https://miro.medium.com/max/718/1*Zs6rxabKSVICkwNGFzdtrQ.png)v10\_test.csv

**執行test會去讀取test.csv。**

`table = pd.read_csv(test_path+file)`

**然後將題目洗牌。**

`lists = random.sample(list, len(list))`

**再來會判斷是否有圖片。**

```
if(os.path.isfile(im\_path)):#是否有圖片  
    print("請看附圖...\\n")  
    time.sleep(1)  
    im = Image.open(r"{}".format(im\_path))  
    im.show()
```

**最後計算分數。**

```
count\_score()  
process.set\_description(“分數:”)  
process.update(number\_correct)
```

3\. report
----------

當測驗完成會將分數以及測驗的題目產生統計資料，這樣就可以反覆查詢自己不會的題目。

```
report\_list.to\_csv(report\_path+datetime.today().strftime('%Y\_%m\_%d')+"\_report.csv")
```

**以上就是我針對CEH考古題所做的小小專案，同樣的方法也可以應用在其他類型的考試，例如前面提到的Java OCP JP等等，只要修改檔案名稱、封面頁頁數、頁首頁尾行數，以及題目的格式，就可以完成不錯的測驗程式，希望這樣的專案可以幫助我們順利通過考試，順利拿到證照。**

如果有任何建議或回饋，歡迎留言，謝謝!!
