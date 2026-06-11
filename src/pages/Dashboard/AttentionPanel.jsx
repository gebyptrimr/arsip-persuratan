function AttentionPanel() {

    const notifications = [
        {
            title: "Arsip Retensi",
            message: "12 arsip memasuki masa retensi.",
            icon: "ti ti-clock",
            type: "warning",
        },
        {
            title: "Kontrak Berakhir",
            message: "3 kontrak akan berakhir bulan ini.",
            icon: "ti ti-file-alert",
            type: "danger",
        },
        {
            title: "Surat Belum Diverifikasi",
            message: "5 surat masuk belum diverifikasi.",
            icon: "ti ti-mail",
            type: "info",
        },
        {
            title: "Backup Arsip",
            message: "Backup terakhir dilakukan 7 hari lalu.",
            icon: "ti ti-database",
            type: "secondary",
        },
    ];

    return (
        <div className="attention-card">

            <div className="attention-header">
                <h3>Perlu Perhatian</h3>
            </div>

            <div className="attention-list">

                {notifications.map((item, index) => (
                    <div
                        key={index}
                        className={`attention-item ${item.type}`}
                    >

                        <div className="attention-icon">
                            <i className={item.icon}></i>
                        </div>

                        <div className="attention-content">
                            <h4>{item.title}</h4>

                            <p>{item.message}</p>
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default AttentionPanel;