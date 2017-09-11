var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var pageModel = mongoose.model('pageModel', pageSchema);
var websiteModel = require("./website.model.server");

pageModel.createPage = createPage;
pageModel.deletePage = deletePage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;

module.exports = pageModel;

function updatePage(pageId, page) {
    return pageModel
        .update({_id: pageId}, {$set: page});
}

function findPageById(pageId) {
    return pageModel
        .findById(pageId);
}

function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({_website: websiteId});
}

function deletePage(pageId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var websiteId = page._website;
            return websiteModel
                .deletePage(websiteId, pageId)
                .then(function () {
                    return pageModel
                        .remove({_id: pageId});
                })
        })
}

function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPage(websiteId, page._id);
        })
}


