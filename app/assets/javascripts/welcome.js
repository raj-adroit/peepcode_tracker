$(document).ready(function(){
	Screencast = Backbone.Model.extend({
		url : function() {
			return "/videos/" + this.get('id') + ".json";
		}
	});

	/* collections */

	var Screencasts = Backbone.Collection.extend({
		model : Screencast
	});
	var screencasts = new Screencasts();

	screencasts.url = "/videos.json";

	screencasts.fetch({
		success : function(){
			screencasts_view  = new ScreencastsView({});
			_.each(screencasts.models, function(model) {
				screencasts_view.addOne(model);
			});
		}
	});

    /* list view */

    var ScreencastsView = Backbone.View.extend({
    	el : ".screencasts",
    	addOne : function(model) {
    		view = new ScreencastView({ model : model });
			if(model.get('watched') ==  true) {
				$(view.el).addClass('watched');
			}
			var img = $('<img/>').attr({ 'src' : model.get('image')});
			$(view.el).append(img);
			$('ul.screencasts').append(view.render());	
    	}
    });


	/* view */

	var ScreencastView = Backbone.View.extend({
		tagName : "li",
		events : {
			"click" : "toggleWatched"
		},
		toggleWatched : function() {
			if(this.model.get('watched') ==  true) {
				this.model.set({ 'watched' : false}).save();
			}
			else {
				this.model.set({ 'watched' : true}).save();
			}
			$(this.el).toggleClass('watched');
		},
		render : function(){
			return $(this.el).text(this.model.get('title'));
		}
	});



});