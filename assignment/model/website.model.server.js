var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var db = require("./database");
var websiteModel = mongoose.model('websiteModel', websiteSchema);
var userModel = require("./user.model.server");

websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.addPage = addPage;
websiteModel.deletePage = deletePage;

module.exports = websiteModel;

function deletePage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        })
}

function addPage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        });
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId}, {$set: website});
}

function findWebsiteById(websiteId) {
    return websiteModel
        .findById(websiteId);
}

function deleteWebsite(websiteId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            var userId = website._user;
            return userModel
                .deleteWebsite(userId, websiteId)
                .then(function () {
                    return websiteModel
                        .remove({_id: websiteId});
                })
        });
}

function createWebsiteForUser(userId, website) {
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function (website) {
            return userModel
                .addWebsite(userId, website._id);
        })
}

function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user: userId});
}