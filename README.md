# KPJSFL
  KPJSFL是通过配置生成文档的脚本,是基于域加载的素材打包好帮手.
##### 用途
1. 图片swf打包,并附带压缩处理. 
2. 音频swf打包,并附带比特压缩处理. 
3. SimpleButton按钮生成,生成带帧标签,带图层,带交互事件音效,带坐标定位的按钮. 
4. 影片剪辑生成,生成带帧标签,带图层,带音效(不推荐),带坐标定位的影片剪辑.
5. 字体打包,基于flash professional的字体嵌入swf打包.
以上功能可随意组合.


##### 配置接口
###### 1.图片配置格式:
```xml
<bitmap source_path="资源绝对地址" link_name="导出类名,缺省值" quality="压缩品质,缺省值"/>
```

参数|介绍|示例
---|---|---
source_path|资源绝对地址|D:/assets/1.png
link_name|导出类名|Image
quality|压缩品质|80

###### 2.音频配置格式:
```xml
<sound source_path="资源绝对地址" link_name="导出类名,缺省值" bit="比特率.枚举值:(8 kbps,16 kbps,20
kbps,24 kbps,32 kbps,48 kbps,56 kbps,64 kbps,80 kbps,112 kbps,128 kbps,160 kbps)" stereo="是否是立体声(true),单声道(false)" quality="压缩品质.枚举值(Fast,Medium,Best)"/>
```

参数|介绍|示例
---|---|---
source_path|资源绝对地址|D:/assets/click.mp3
link_name|导出类名|GameSound
bit|比特率|64 kbps
stereo|是否立体声|false
quality|音频品质|Best


###### 3.SimpleButton配置格式:
```xml
<button item_name="按钮名" link_name="导出类名,缺省值">
    <layer name="图层名">
		<frame start_index="开始帧" end_index="结束帧并包含" quality="压缩品质,缺省值" label="帧标签,缺省值" source_path="资源绝对地址,缺省则空帧" x="坐标x" y="坐标y"/>
		<!--亦可插入音频帧,包含如下参数(如果需要音频压缩请先导入音频素材,通过sound标签-->
		<frame start_index="开始帧" end_index="结束帧并包含" source_path="音频资源绝对地址" label="帧标签,缺省值"/>
		<!--frame无限插入-->
	</layer>
	<!--layer无限插入-->
</button>
```
button

参数|介绍|示例
---|---|---
item_name|按钮名|btn1
link_name|导出类名|GameBtn

layer

参数|介绍|示例
---|---|---
name|图层名|layer1

frame 图片帧

参数|介绍|示例
---|---|---
start_index|开始帧|1
end_index|结束帧(包含结束帧)|2
source_path|资源绝对地址|D:/assets/1.png
x|x坐标|0
y|y坐标|0
label|帧标签|assets_label
quality|图片品质|80

frame 音频帧

参数|介绍|示例
---|---|---
start_index|开始帧|1
end_index|结束帧(包含结束帧)|2
source_path|音频绝对地址|D:/assets/click.mp3
label|帧标签|sound_label




###### 4.影片剪辑配置格式:
```xml
<movie  item_name="影片剪辑名" link_name="导出类名,缺省值">
	<layer name="图层名">
        <frame start_index="开始帧" end_index="结束帧并包含" quality="压缩品质,缺省值" label="帧标签,缺省值" source_path="资源绝对地址,缺省则空白关键帧" x="坐标x" y="坐标y"/>
        <!--frame无限插入-->
    </layer>
    <!--layer无限插入-->
</movie>
```

movie

参数|介绍|示例
---|---|---
item_name|影片剪辑名|movie1
link_name|导出类名|GameMovie

layer

参数|介绍|示例
---|---|---
name|图层名|layer1

frame 图片帧

参数|介绍|示例
---|---|---
start_index|开始帧|1
end_index|结束帧(包含结束帧)|2
source_path|资源绝对地址|D:/assets/1.png
x|x坐标|0
y|y坐标|0
label|帧标签|assets_label
quality|图片品质|80


###### 5.字体配置格式:
```xml
<font item_name="元件名称" font_name="嵌入字体名称" link_name="导出类名" is_FTE="是否使用FTE引擎" bold="加粗(true,false)" italic="斜体(true,false)" embed_ranges="字体嵌入对话框中可以选择的项目对应 like 1|3|5">
    <![CDATA[嵌入的字符]]>
</font>
```

font 

参数|介绍|示例
---|---|---
item_name|字体元件名称|font1
font_name|嵌入字体名称|Arial
link_name|导出类名|MyFont
is_FTE|是否使用FTE引擎|false
bold|加粗|true
italic|斜体|false
embed_ranges|字体嵌入对话框中可以选择的项目对应| ```1|2|3```
CDATA节点|嵌入字符|abc

textField,matrix控制等功能待续. <br>
基于域的加载管理,安全省心.




