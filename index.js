const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const schedule = require('node-schedule');

// Criar o cliente WhatsApp com autenticação local
const client = new Client({
    authStrategy: new LocalAuth()
});

// Gerar o QR Code para autenticação
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Após autenticação, envia a mensagem para os grupos
client.on('ready', () => {
    console.log('Bot está pronto!');
    sendDailyMessage();
    scheduleDailyMessage();
});

// Função para enviar a mensagem
const sendDailyMessage = async () => {
    const message = `🛩🏎🕹 HOBBY SKY LOJA DE HOBBIES 🛩🏎🕹

🤩 PROMOÇÕES IMPERDÍVEIS SÓ AQUI!🤩

Acessórios para aeromodelos: https://s.click.aliexpress.com/e/_DkCEVzB
Aeromodelos e hobbies: https://sweet-pithivier-d2671e.netlify.app
Acessórios em geral para hobbies radiocontrolados: https://s.click.aliexpress.com/e/_DdoycXx
FPV e Drones: https://s.click.aliexpress.com/e/_DBt5ZVx
Automodelos e Acessórios: https://s.click.aliexpress.com/e/_DnnsVJX
Aeromodelos em escala: https://s.click.aliexpress.com/e/_DFlzg2l
Acessórios de Jatos: https://s.click.aliexpress.com/e/_Dkk7OyD
Aeromodelos Jatos, Freewing e outros: https://s.click.aliexpress.com/e/_DDi7cqV

🛩 PRECISOU DE ALGO E NÃO ENCONTROU? AGENTE ESTÁ AQUI PARA AJUDAR!:
https://s.click.aliexpress.com/e/_oFYht2n

🤩 HOBBY SKY - SEU DESTINO PARA TODOS OS HOBBIES! 🤩

HOBBY SKY É PROMOÇÕES!`;

    // Substitua pelo número do grupo que você deseja enviar a mensagem
    const groupID = 'seu-grupo-id-aqui@group.whatsapp.com';
    const group = await client.getChats().then(chats => chats.find(chat => chat.id._serialized === groupID));
    if (group) {
        await group.sendMessage(message);
        console.log('Mensagem enviada!');
    } else {
        console.log('Grupo não encontrado!');
    }
};

// Agenda para enviar a mensagem todos os dias às 12:00
const scheduleDailyMessage = () => {
    schedule.scheduleJob('0 12 * * *', () => {
        sendDailyMessage();
    });
};

client.initialize();
