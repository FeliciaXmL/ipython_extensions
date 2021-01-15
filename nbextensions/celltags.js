/*

Add this file to $(ipython locate)/nbextensions/celltags.js
And load it with:

IPython.load_extensions("celltags");
*/
define([
    "jquery",
    "base/js/namespace",
    "notebook/js/celltoolbar"
    ], function ($, IPython, ctb) {
        
    tags_from_input = function (input_element) {
         tag_str = input_element.val();
        tags;
        (tag_str.trim().length === 1) {
            tags = [];
        }  {
     
            );
        }
        return tags;
    };
    
     filter_tagged_cells =  () {
        active_tags = IPython.notebook.metadata.active_cell_tags;
         cells = IPython.notebook.get_cells();
         tags;
        active_tags.length === 0 || !tags || tags.length === 0) {
                cell.element.show();
            } else {
                var tag_match = false;
                ( j = 0; j < tags.length; j++) {
                     tag = tags[j];
                     (active_tags.indexOf(tag) > -1) {
                        tag_match = true;
                        ;
                    }
                }
                (tag_match) {
                    cell.element.show();
                }  {
                    cell.element.hide();
                }
            }
        }
    };
    
     add_tags_input = function (div, cell) {
         container = $(div);
        container.append($("<span/>").text("tags").css("padding", "5px"));
        input = $('<input/>')
            .attr("size", 100)
            .val(
                (cell.metadata.tags || []).join(", ")
            )
            .on("focusout", function () {
                cell.metadata.tags = tags_from_input(input);
                filter_tagged_cells();
            });
       (cell.keyboard_manager) {
            cell.keyboard_manager.register_events(input);
        }
        container.append(input);
    };
    
    add_tag_toolbar = function () {
         tag_toolbar = $("#tag_toolbar");
         (tag_toolbar.length === 0) {
            tag_toolbar = $("<div/>").attr("id", "tag_toolbar");
            $("#menubar-container").append(tag_toolbar);
        }
         active_tags_input = $("<input/>")
        active_tags_input
            .attr("id", "active_tag_input")
            .attr("size", 100)
            .val(
                (IPython.notebook.metadata.active_cell_tags || []).join(", ")
            ).on("focusout", function () {
                IPython.notebook.metadata.active_cell_tags = tags_from_input(active_tags_input);
                filter_tagged_cells();
            });
        IPython.notebook.keyboard_manager.register_events(active_tags_input);
        tag_toolbar.html("")
            .append($("<span/>")
                .css("padding", "5px")
                .text("filter tags"))
            .append(active_tags_input);
        filter_tagged_cells();
    };
    
     register_celltoolbar = function () {
        CellToolbar.register_callback('tags.input', add_tags_input);

        preset = ["tags.input"];

        .CellToolbar.register_preset('Cell Tags', preset, IPython.notebook, IPython.events);
        console.log('Cell tags loaded.');
    };
    
    load_ipython_extension = function () {
        
        (IPython.notebook) {
            add_tag_toolbar();
            register_celltoolbar();
        }
        $([IPython.events]).on("notebook_loaded.Notebook", register_celltoolbar);
        $([IPython.events]).on("notebook_loaded.Notebook", add_tag_toolbar);
    };
    
    return {
        load_ipython_extension : load_ipython_extension,
    };
    
});
