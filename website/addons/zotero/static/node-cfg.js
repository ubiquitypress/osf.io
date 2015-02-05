var $ = require('jquery');
var ko = require('knockout');
var $osf = require('osfHelpers');

var ZoteroAccount = function(display_name, id) {
    var self=this;
    self.display_name = display_name;
    self.id = id;
};

var CitationList = function(name, provider_list_id, provider_account_id ) {
    var self=this;
    self.name = name;
    self.provider_list_id = provider_list_id;
    self.provider_account_id = provider_account_id;
};

var ZoteroSettingsViewModel = function() {
    var self=this;

    self.accounts = ko.observableArray();
    self.selectedAccount = ko.observable();
    self.citationLists = ko.observableArray();
    self.selectedAccount.subscribe(function(value) {
        self.updateCitationLists();
    });
    self.selectedCitationList = ko.observable();

    $.getJSON(nodeApiUrl + 'mendeley/accounts/', function(data) {
        for(var i=0; i<data.accounts.length; i++) {
            self.accounts.push(new ZoteroAccount(
                data.accounts[i].display_name,
                data.accounts[i].id
            ))
        }
        self.accounts.push(new ZoteroAccount('foo', 'bar'));
        self.selectedAccount(self.accounts()[0]);
    }).fail(function() {
        console.log("Failed to load list of accounts");
    });

    self.updateCitationLists = function() {
        $.getJSON(
            nodeApiUrl + 'zotero/' + self.selectedAccount() + '/lists/',
            function(data) {
                self.citationLists(ko.utils.arrayMap(data.citation_lists, function(item) {
                    return new CitationList(item.name, item.provider_list_id, item.provider_account_id);
                }));
            }
        );
    }

    self.updateCitationLists();


};

////////////////
// Public API //
////////////////

function ZoteroSettings (selector) {
    var self = this;
    self.selector = selector;
    self.$element = $(selector);
    self.viewModel = new ZoteroSettingsViewModel();
    self.init();
}

ZoteroSettings.prototype.init = function() {
    var self = this;
    ko.applyBindings(self.viewModel, self.$element[0]);
};

//module.exports = ZoteroSettings;
new ZoteroSettings('#addonSettingsZotro');

