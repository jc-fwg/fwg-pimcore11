document.addEventListener(pimcore.events.postOpenObject, (e) => {
    const object = e.detail.object;

    if (object.data.general.className !== 'Blogpost') {
        return;
    }

    const button = new Ext.Button({
        text: 'Update external links check',
        iconCls: 'update_external_links_icon',
        handler: () => {
            const blogppostId = object.data.general.id;

            const url = `/admin/app/blogpost/update-external-links-check/${blogppostId}`;

            pimcore.helpers.loadingShow();

            Ext.Ajax.request({
                url: url,
                method: 'GET',
                ignoreErrors: true,
                success: function (response) {
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

                    Ext.Msg.alert(
                        'Success',
                        msg,
                    );
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
