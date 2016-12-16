/**
 *@author:fangtao
 *@date:2015-12-06
 *@support:525398535@qq.com
 */

var current_directory = fl.scriptURI.substr(0, fl.scriptURI.lastIndexOf("/") + 1);

fl.runScript(current_directory + "GlobalLibs.jsfl");

//create_doc_path(get_current_path() + "config.xml");//测试目录下的config.xml脚本

create_doc_path.help = "通过配置表地址创建文档并导出";
function create_doc_path(path) {
	var config_str = load_config(path);
	var config = XML(config_str);
	create_doc(config);
}

create_doc.help = "通过配置创建文档并导出";
function create_doc(config) {
	var doc_name = String(config.@doc_name);
	var doc_dir = String(config.@doc_dir);
	var publish_name = String(config.@publish_name);
	var doc_class = String(config.@doc_class);
	var is_update = String(config.@update) == "true";


	if (doc_dir == "") {
		doc_dir = get_current_path();
	}
	var doc_path = doc_dir + doc_name;

	var doc = null;
	var exists = file_exists(doc_path);
	if (is_update && exists) {
		doc = openDoc(doc_path);
	} else {
		doc = save_new_doc(doc_path);
	}
	var lib = doc.library;

	doc.docClass = doc_class;

	var sound_list = config.sound;
	for each(var xml_sound in sound_list) {
		create_sound(doc, xml_sound);
	}

	var bitmap_list = config.bitmap;
	for each(var xml_bitmap in bitmap_list) {
		if (is_update) {
			update_bitmap(doc, xml_bitmap);
		} else {
			create_bitmap(doc, xml_bitmap);
		}

	}

	var movie_list = config.movie;
	for each(var xml_movie in movie_list) {
		create_item(doc, xml_movie, "movieclip");
	}

	var button_list = config.button;
	for each(var xml_button in button_list) {
		create_item(doc, xml_button, "button");
	}

	var font_list = config.font;
	for each(var xml_font in font_list) {
		create_font(doc, xml_font);
	}

	if (publish_name != "") {
		publish_rename_SWF(doc, publish_name);
	}
	publish_without_HTML(doc);
	doc.save();
	doc.publish();
	doc.close();
}

create_font.help = "通过配置表在文档中创建导出字库";
function create_font(doc, xml_font) {
	var lib = doc.library;
	var item_name = String(xml_font.@item_name);
	var font_name = String(xml_font.@font_name);
	var link_name = String(xml_font.@link_name);
	var is_FTE = String(xml_font.@is_FTE) == "true";
	var bold = String(xml_font.@bold) == "true";
	var italic = String(xml_font.@italic) == "true";
	var embed_ranges = String(xml_font.@embed_ranges);
	var embed_char = String(xml_font);
	lib.addNewItem("font", item_name);
	var isFontInstalled = fl.isFontInstalled(font_name);
	if (!isFontInstalled) {
		trace("字体:", font_name, "无法找到");
	}
	var item = get_item_by_name(doc, item_name);
	item.font = font_name;
	item.isDefineFont4Symbol = is_FTE;
	item.embeddedCharacters = embed_char;
	item.bold = bold;
	item.italic = italic;
	item.embedRanges = embed_ranges;
	set_item_link(item, link_name);
}

create_sound.help = "通过配置表在文档中创建导出音频";
function create_sound(doc, xml_sound) {
	var source_path = String(xml_sound.@source_path);
	var link_name = String(xml_sound.@link_name);
	var bit = String(xml_sound.@bit);
	var is_stereo = String(xml_sound.@stereo) == "true";
	var quality = String(xml_sound.@quality);
	var item = import_to_lib(doc, source_path);
	item.useImportedMP3Quality = false;
	item.compressionType = "MP3";
	item.bitRate = bit;
	item.convertStereoToMono = !is_stereo;
	item.quality = quality;
	set_item_link(item, link_name);
}

create_bitmap.help = "通过配置表在文档中创建导出图片";
function create_bitmap(doc, xml_bitmap) {
	var source_path = String(xml_bitmap.@source_path);
	var link_name = String(xml_bitmap.@link_name);
	var quality = Number(xml_bitmap.@quality);
	var item = import_to_lib(doc, source_path);

	var has_name = xml_has_attribute(xml_bitmap, "rename");

	if (has_name) {
		item.name = String(xml_bitmap.@rename);
	}

	if (quality != 0) {
		image_compress(item, quality);
	}
	set_item_link(item, link_name);
}

update_bitmap.help = "通过配置表的link_name在文档中更新图片";
function update_bitmap(doc, xml_bitmap) {
	var link_name = String(xml_bitmap.@link_name);
	var has_name = xml_has_attribute(xml_bitmap, "rename");
	var rename = String(xml_bitmap.@rename);

	var item = get_item_by_link(doc, link_name);

	if (item && has_name && item.name != rename) {
		doc.library.deleteItem(item.name);
		create_bitmap(doc, xml_bitmap);
	} else if (item && has_name && item.name == rename) {
		return; //存在 同名 跳过
	} else {
		create_bitmap(doc, xml_bitmap);
	}


}

create_item.help = "通过配置表在文档中创建导出元件 item_type包含movieclip,button";
function create_item(doc, xml_item, item_type) {
	var lib = doc.library;
	var item_name = String(xml_item.@item_name);
	var link_name = String(xml_item.@link_name);
	lib.addNewItem(item_type, item_name);
	lib.editItem(item_name);
	var timeline = doc.getTimeline();

	var layer_list = xml_item.layer;

	for (var i = 0; i < layer_list.length(); i++) {
		var xml_layer = layer_list[i];
		var layer_name = String(xml_layer.@name);

		timeline.addNewLayer(layer_name, "normal", false);
		timeline.setSelectedLayers(i + 1);
		timeline.removeFrames();

		var frame_list = xml_layer.frame;
		var last_end_index = -1;
		for each(var xml_frame in frame_list) {

			var start_index = Number(xml_frame.@start_index);
			var end_index = Number(xml_frame.@end_index);
			var frame_source = String(xml_frame.@source_path);
			var quality = Number(xml_frame.@quality);
			var x = Number(xml_frame.@x);
			var y = Number(xml_frame.@y);
			var label = String(xml_frame.@label);

			if (last_end_index != -1 && start_index - last_end_index > 1) {
				timeline.insertBlankKeyframe(last_end_index);
			} else {
				timeline.insertBlankKeyframe(start_index - 1);
			}
			if (label != "") {
				timeline.layers[timeline.currentLayer].frames[timeline.currentFrame].name = label;
			}
			if (frame_source != "") {
				var item = import_to_lib(doc, frame_source);
				if (quality != 0) {
					image_compress(item, quality);
				}

				lib.addItemToDocument({
					x: x + item.hPixels / 2,
					y: y + item.vPixels / 2
				}, item.name);

				var has_scaleX = xml_has_attribute(xml_frame, "scaleX")
				var has_scaleY = xml_has_attribute(xml_frame, "scaleY")

				if (has_scaleX) {
					var __scaleX = Number(xml_frame.@scaleX)
					fl.getDocumentDOM().selection[0].scaleX = __scaleX;
				}

				if (has_scaleY) {
					var __scaleY = Number(xml_frame.@scaleY)
					fl.getDocumentDOM().selection[0].scaleY = __scaleY;
				}

			}
			var insert_frame = end_index - start_index;
			timeline.insertFrames(insert_frame, false);
			last_end_index = end_index;
		}
	}
	timeline.deleteLayer(0);
	var item = get_item_by_name(doc, item_name);
	set_item_link(item, link_name);
}