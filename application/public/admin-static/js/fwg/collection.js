document.addEventListener(pimcore.events.postOpenObject, (e) => {
    const object = e.detail.object;

    if (object.data.general.className !== 'Collection') {
        return;
    }

    const button = new Ext.Button({
        text: 'Fetch infotext from AI',
        iconCls: 'fetch_infotext_from_ai_icon',
        handler: () => {
            const collectionId = object.data.general.id;

            const url = `/admin/app/collection/infotext/${collectionId}`;

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

                    let msg =
                        response.responseText ||
                        response.statusText ||
                        'HTTP ' + response.status;
                    try {
                        const json = JSON.parse(response.responseText);
                        msg = json.message || msg;
                    } catch (_) {}

                    Ext.Msg.alert(
                        'Success',
                        msg,
                    );

                    if (collectionId !== null) {
                        pimcore.treenodelocator.showInTree(collectionId, 'object');
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
