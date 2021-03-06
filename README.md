# KPJSFL
  KPJSFL是通过配置生成文档的脚本,是基于域加载的素材打包好帮手.
v1.3.0
##### 功能
1. 图片swf打包,并附带压缩处理. 
2. 音频swf打包,并附带比特压缩处理. 
3. SimpleButton按钮生成,生成带帧标签,带图层,带交互事件音效,带坐标定位的按钮. 
4. 影片剪辑生成,生成带帧标签,带图层,带音效(不推荐),带坐标定位的影片剪辑.
5. 字体打包,基于flash professional的字体嵌入swf打包.

##### 项目基于Adobe Flash Professional CC制作,其他版本基本可用,但不提供支持


Installer.jsfl是用于安装的脚本运行后导入系统位置.<br/>
在安装脚本执行后可以通过以下方式导入.
```js
var file = fl.configURI + 'KPJSFL/CreateScript.jsfl';
fl.runScript(file);
```

参阅examples文件夹


##### 1.图片配置格式:
```xml
<bitmap source_path="" link_name="" quality=""/>
<!--bitmap后续插入-->
```
###### bitmap标签参数
参数|简介|示例|提示
---|---|---|---
source_path|资源路径|D:/assets/1.png|硬盘绝对路径
link_name|导出类名|Image|缺省为空
quality|压缩品质|80|缺省(0)则不压缩
rename|重命名|abc|缺省则不重命名

##### 2.音频配置格式:
```xml
<sound source_path="" link_name="" bit="" stereo="" quality=""/>
<!--sound后续插入-->
```
###### sound标签参数
参数|简介|示例|提示
---|---|---|---
source_path|资源路径|D:/assets/click.mp3|硬盘绝对路径
link_name|导出类名|GameSound|缺省为空
bit|比特率|64 kbps|支持以下值:<br>8 kbps,16 kbps,20 kbps,24 kbps,32 kbps,48 kbps,56 kbps,64 kbps,80 kbps,112 kbps,128 kbps,160 kbps
stereo|是否立体声|true|布尔值,缺省为false
quality|音频品质|Best|支持以下值:<br>Fast,Medium,Best


##### 3.SimpleButton配置格式:
```xml
<button item_name="" link_name="">
    <layer name="">
		<frame start_index="" end_index="" quality="" label="" source_path="" x="" y=""/>
		<!--亦可插入音频帧,包含如下参数(如果需要音频压缩请先导入音频素材,通过sound标签-->
		<frame start_index="" end_index="" source_path="" label=""/>
		<!--frame后续插入-->
	</layer>
	<!--layer后续插入-->
</button>
<!--button后续插入-->
```

###### button标签参数
参数|简介|示例|提示
---|---|---|---
item_name|按钮名称|btn1|元件在库中的名称
link_name|导出类名|GameBtn|缺省为空

###### layer节点参数
参数|简介|示例|提示
---|---|---|---
name|图层名称|layer1|按钮中的图层名称

###### frame节点参数(图片)
参数|简介|示例|提示
---|---|---|---
start_index|起始帧|1|帧数从1开始
end_index|结束帧|2|结束帧包含当前帧,与起始帧相同则为单帧
source_path|资源路径|D:/assets/1.png|硬盘绝对路径,缺省则为空白关键帧
x|x坐标|0|缺省(0),资源在舞台上的坐标X
y|y坐标|0|缺省(0),资源在舞台上的坐标Y
label|帧标签|assets_label|缺省,用于标记的帧标签
quality|图片品质|80|缺省(0)则不压缩
scaleX|ScaleX|1|缺省(1),资源在舞台上的X轴拉伸翻转情况
scaleY|ScaleY|1|缺省(1),资源在舞台上的Y轴拉伸翻转情况

###### frame节点参数(音频)
参数|简介|示例|提示
---|---|---|---
start_index|开始帧|1|帧数从1开始
end_index|结束帧(包含结束帧)|2|结束帧包含当前帧,与起始帧相同则为单帧
source_path|音频绝对地址|D:/assets/click.mp3|用于制作事件音效,如点击
label|帧标签|sound_label|缺省,用于标记的帧标签




##### 4.影片剪辑配置格式:
```xml
<movie  item_name="" link_name="">
	<layer name="">
        <frame start_index="" end_index="" quality="" label="" source_path="" x="" y=""/>
        <!--frame后续插入-->
    </layer>
    <!--layer后续插入-->
</movie>
<!--movie后续插入-->
```

###### movie标签参数
参数|简介|示例|提示
---|---|---|---
item_name|影片剪辑名|movie1|元件在库中的名称
link_name|导出类名|GameMovie|缺省为空

###### layer节点参数
参数|简介|示例|提示
---|---|---|---
name|图层名|layer1|影片剪辑中的图层名称

###### frame节点参数
参数|简介|示例|提示
---|---|---|---
start_index|开始帧|1|帧数从1开始
end_index|结束帧(包含结束帧)|2|结束帧包含当前帧,与起始帧相同则为单帧
source_path|资源绝对地址|D:/assets/1.png|硬盘绝对路径,缺省则为空白关键帧
x|x坐标|0|缺省(0),资源在舞台上的坐标X
y|y坐标|0|缺省(0),资源在舞台上的坐标Y
label|帧标签|assets_label|缺省,用于标记的帧标签
quality|图片品质|80|缺省(0)则不压缩
scaleX|ScaleX|1|缺省(1),资源在舞台上的X轴拉伸翻转情况
scaleY|ScaleY|1|缺省(1),资源在舞台上的Y轴拉伸翻转情况


##### 5.字体配置格式:
```xml
<font item_name="" font_name="" link_name="" is_FTE="" bold="" italic="" embed_ranges="">
    <![CDATA[]]>
</font>
<!--font后续插入-->
```

###### font标签参数
参数|简介|示例|提示
---|---|---|---
item_name|字体元件名称|font1|字体文件在库中的名称
font_name|嵌入字体名称|Arial|嵌入字体在系统中的名称
link_name|导出类名|MyFont|缺省为空
is_FTE|是否使用FTE引擎|false|FTE引擎(true)和TLF引擎(false)
bold|加粗|true|缺省(false)
italic|斜体|false|缺省(false)
embed_ranges|字体嵌入对话框中的项目对应| ```1|2|3``` |Flash Professional中的打包选项
CDATA节点|嵌入字符|abc|自由输入

textField,matrix控制等功能待续. <br>
基于域的加载管理,安全省心.

## support
Email:masterkpr@gmail.com




