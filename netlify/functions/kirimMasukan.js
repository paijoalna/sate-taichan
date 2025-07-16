const fetch = require("node-fetch");

exports.handler = async (event) => {
    try {
        const data = JSON.parse(event.body);
        const nama = data.nama || "-";
        const masukan = data.masukan || "-";
        const rating = data.rating || "-";

        const token = process.env.TELEGRAM_TOKEN;
        const chat_id = process.env.CHAT_ID;

        // Jangan kirim kalau semua data kosong
        if (nama === "-" && masukan === "-" && rating === "-") {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Data kosong. Tidak ada yang dikirim." })
            };
        }

        const text = `🍢 Masukan Baru dari Customer:\n\n👤 Nama: ${nama}\n⭐ Rating: ${rating} bintang\n💬 Masukan: ${masukan}`;

        await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(text)}`);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Masukan dan rating terkirim." })
        };
    } catch (err) {
        console.error("Gagal mengirim ke Telegram:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Terjadi kesalahan saat mengirim data." })
        };
    }
};
