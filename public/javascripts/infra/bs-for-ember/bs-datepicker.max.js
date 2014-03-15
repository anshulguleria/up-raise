/*
    It implements bootstrap datepicker plugin.[NOTE: This plugin is not yet supported by bootstrap itself, and and extention at http://www.eyecon.ro/bootstrap-datepicker/ is used
        to implement the bootstrap-datepicker, thus on changes it will need to be updated.]

    Configurations and defaults:
        datePickerTemplate: the template used to render the date picker's input box and add-on. Properties are provided to change the class of these two components,
            inputClassNames: to configure the class on the input box. DEFAULT: 'span2'
            inputType: to configure the type of input. DEFAULT: 'text'
            inputValue: to configure the value of the inputbox. DEFALUT: null
            inputPlaceHolder: to configure the placeholder property of the input box. DEFAULT: 'select date'

            iconClassNames: to configure the class names on the icon shown at the date-picker. DEFALUT: 'icon-th'

        uiOptions:
          //option    //type            //default                //explaination
            
            format	    string	        'mm/dd/yyyy'	the date format, combination of d, dd, m, mm, yy, yyy.
                                                        this format can also be applied using the data-date-format attribute of html5
            weekStart	integer	        0	            day of the week start. 0 for Sunday - 6 for Saturday
            viewMode	string|integer	0 = 'days'	    set the start view mode. Accepts: 'days', 'months', 'years', 0 for days, 1 for months and 2 for years
            minViewMode	string|integer	0 = 'days'	    set a limit for view mode. Accepts: 'days', 'months', 'years', 0 for days, 1 for months and 2 for years

        usage:  $('#datePickerelement').datepicker({
                    format: 'dd/mm/yyyy',
                    viewMode: 'days',
                    minViewMode: 'days',
                     
                });

        templateUsage:
                {{view Mystique.Views.BSDatePickerView format='dd-mm-yyyy' valueBinding='view.selectedDate' viewMode='Months' minViewMode='days'}}

    Events: 
        * show and hide events are used by regestering a listener on the element e.g. $('.datepicker').on('show', function(){});
            show is fired when the datepicker is displayed and hide is triggered when the datepicker is hidden.
        * changeDate and onRender can be implemented directely in your view and it will be called.
        [NOTE: onRender and changeDate are already implemented in this plugin, so if these functions are overridden then we need to call this._super()
            to make sure the functionality implemented is not broken.

        * changeDate: called each time when the date is selected. USAGE: bootstrap-datepicker does not closes automatically when the date is selected thus this function
            can be overridden to close the date picker when the date is selected.

            ADVANCED TACTICS: based on the viewMode we can decide weather to close the calender on click or not. e.g. 

                changeDate: function (ev) {
                    //hide only when the viewMode is in days
                    if (ev.viewMode == 'days') {
                        this.hide();
                    }
                },
                //other suported viewModes are "days", "months", "years"

        * onRender: this method is called each time when a day is rendered on the calender. USAGE: So if we want to disable some days based on some value, this would
            be the right place to do some checking and return string "disabled" to disable the day.

        * minDate and maxDate: sets the min and max date for the date-picker
            [NOTE: this property is not provided by the actual plugin we have created this property thus it may change with the change in plugin.
                since minDate and maxDate are are doing their functioning you may not need the onRender method to disable the invalid dates.
    
    Mehods: 
        Date picker is initialized automatically in the didInsertElement with the options provided by you, thus if you are overriding this mehod don't forget to call this._super() method.
        
        show: this method is written our plugin and can be called to show the date picker.
        hide: call this method to hide the datepicker
        place: updates the date-picker position relative to the element. USAGE: should be called if due to some reason your position is changing.
        setValue(value): Set a new value for the datepicker. It cand be a string in the specified format or a Date object.

        all these methods can be directely called using the this.show()/this.hide()...... 



*/

//TODO: The change of date is not triggered every time. Only at the time of hiding the value is getting updated.
//TODO: need to evaluate other date-pickers which suport more variety of formats and more viewModes




    var datePickerTemplate = ["{{view Em.TextField classBinding='view.inputClassNames' typeBinding='view.inputType' placeholderBinding='view.inputPlaceHolder' valueBinding='view.inputValue' tabindexBinding='view.inputTabIndex'}}",
                            '<span class="add-on"><i {{bindAttr class="view.iconClassNames"}}  ></i></span>'].join('\n');

    Ember.TEMPLATES["DatePickerTemplate"] = Em.Handlebars.compile(datePickerTemplate);
    Em.BSDatePickerView = Em.View.extend({
        datePickerTemlate: '',
        init: function () {
            this._super();
            
            this.setGlobalizationData();
            if (!this.get('datePickerTemplate')) {
                this.set('datePickerTemplate', datePickerTemplate);
            }
            if (!this.get('template'))
                this.set('template', Em.Handlebars.compile(this.get('datePickerTemplate')));

            //setup modes to the string value
            if (typeof (this.get('startView') == 'number')) {
                if (this.get('startView') == 0) {
                    this.set('startViewM', 'hour');
                } else if (this.get('startView') == 1) {
                    this.set('startView', 'day');
                } else if (this.get('startView') == 2) {
                    this.set('startView', 'month');
                } else if (this.get('startView') == 3) {
                    this.set('startView', 'year');
                } else if (this.get('starView') == 4) {
                    this.set('startView', 'decade');

                }

            }
        },

        uiType: 'datepicker',
        uiOptions: ['format', 'weekStart', 'minView', 'startView', 'startDate', 'endDate', 'daysOfWeekDisabled', 'autoclose', 'todayBtn', 'todayHighlight', 'keyboardNavigation', 'forcePrse', 'pickerPosition'],
        uiEvents: ['show', 'hide', 'changeDate', 'onRender'],
        attributeBindings: ['data-date', 'data-date-format'],

        //attribute bindings on the input box type, value


        classNames: ['date'],

        inputType: 'text',
        inputValue: null,
        //this is to keep datepicker UI selected value in sync with the textbox value -> input value given
        //inputValueChanged: function () {
        //    this.validate(this.get('inputValue'));
        //}.observes('inputValue'),
        inputPlaceHolder: 'Select Date',
        inputClassNames: 'span2',
        iconClassNames: 'icon-calendar',



        //this is a hack to refresh the datepicker popup ui and which internally updates the disabled dates
        startDateChanged: function () {
            this.setStartDate(this.get('startDate'));
        }.observes('startDate'),

        weekStart: 0,
        minView: "month",
        startView: "month",

        startDate: new Date(),
        endDate: null,
        daysOfWeekDisabled: [],
        autoclose: true,
        todayBtn: false,
        todayHighlight: false,
        keyboardNavigation: false,
        forceParse: true,
        pickerPosition: "bottom-left",
        format: "mm/dd/yyyy",
        "data-date": function () {
            //check this format function later
            //return new Date().format(this.get('format'));
            return new Date().toLocaleDateString();
        }.property("data-date-format"),

        datePickerElement: null,

        //-----------METHODS
        show: function () {
            this.get('datePickerElement').datetimepicker('show');
        },
        hide: function () {
            this.get('datePickerElement').datetimepicker('hide');
        },

        setStartDate: function (value) {
            this.get('datePickerElement').datetimepicker('setStartDate', value);
        },
        setEndDate: function (value) {
            this.get('datePickerElement').datetimepicker('setEndDate', value);

        },
        //-----------METHODS ENDS

        //show the calender on the click of full view
        click: function () {
            this.show();
        },

        didInsertElement: function () {
            this._super();
            var options = this.gatherOptions();
            this.set('datePickerElement', $('input', this.$()));

            this.get('datePickerElement').datetimepicker(options);
            this.get('datePickerElement').on('keydown.base.date-picker', $.proxy(this.handleKeyInputs, this));

            this.get('datePickerElement').on('changeDate.base.date-picker', $('input'), $.proxy(this.changeDate, this));

    
        },
        willDestroyElement: function () {
            this.get('datePickerElement').off('.base.date-picker');
        },
        validateDate: function (date) {
            date = typeof (date) == 'string' ? Date.parse(date) : date;
            var isValidDate = true;

            if (this.get('startDate')) {
                var lowerValue = (typeof (this.get('startDate')) == 'string' ? Date.parse(this.get('startDate')) : this.get('startDate')).valueOf();
                if (date.valueOf() < lowerValue) {
                    isValidDate = false;
                }
            }

            if (this.get('endDate')) {
                var upperValue = (typeof (this.get('endDate')) == 'string' ? Date.parse(this.get('endDate')) : this.get('endDate')).valueOf();
                if (date.valueOf() > upperValue) {
                    isValidDate = false;
                }
            }

            return isValidDate;
        },
        //todo: remove this function if not in use
        changeDate: function (ev) {
        },
        handleKeyInputs: function (e) {
            if (e.which == 9 || e.which == 27 || e.which == 13)
                this.hide();

        },


        setGlobalizationData: function () {
            $.fn.datetimepicker.dates["en"] = {
                days:  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                daysShort:  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                daysMin:  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                meridiem:  ["AM", "PM"],
                today: "Today",
                rtl: false,

            };


        },

        onRender: function (date) {
            //return disabled if we want to disable the current date getting rendered
            //this disabled class is also applied at the element thus it looks like disabled
            return this.validateDate(date) ? '' : 'disabled';
        },

         gatherOptions: function () {
            var uiOptions = this.get('uiOptions'), options = {};

            uiOptions.forEach(function (key) {
                options[key] = this.get(key);
            }, this);

            var uiEvents = this.get('uiEvents') || [], self = this;

            uiEvents.forEach(function (event) {
                var callback = self[event];

                if (callback && $.isFunction(callback)) {
                    options[event] = $.proxy(callback, self);
                }
            });
            return options;
        }
    });

    


