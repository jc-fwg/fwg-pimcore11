document.addEventListener(pimcore.events.postOpenObject, (e) => {
    const object = e.detail.object;

    if (object.data.general.className !== 'Blogpost') {
        return;
    }

    const button = new Ext.Button({
        text: 'Check broken links',
        iconCls: 'check_broken_links_icon',
        handler: () => {
            const blogppostId = object.data.general.id;

            const url = `/admin/app/blogpost/broken-links/${blogppostId}`;

            pimcore.helpers.loadingShow();

            Ext.Ajax.request({
                url: url,
                method: 'GET',
                ignoreErrors: true,
                success: function (response) {
                    Ext.Msg.hide();
                    pimcore.helpers.loadingHide();

                    pimcore.helpers.closeObject(object.id, 'object');
                    pimcore.helpers.openObject(object.id, 'object');

                    Ext.Msg.alert(
                        'Success',
                        'Infotext fetched successfully.',
                    );

                    if (blogppostId !== null) {
                        pimcore.treenodelocator.showInTree(blogppostId, 'object');
                        return;
                    }

                    pimcore.elementservice.refreshRootNodeAllTrees('object');
                },
                failure: function (response) {
                    Ext.Msg.hide();
                    pimcore.helpers.loadingHide();
                    let msg =
                        response.responseText ||
                        response.statusText ||
                        'HTTP ' + response.status;
                    try {
                        const json = JSON.parse(response.responseText);
                        msg = json.message || msg;
                    } catch (_) {}

                    pimcore.helpers.showNotification(
                        'Error',
                        'Failed to fetch data. ' + msg,
                        'error',
                    );
                },
            });
        },
    });

    object.toolbar.insert(2, button);
});
