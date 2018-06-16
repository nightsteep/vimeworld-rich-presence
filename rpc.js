const DiscordRPC = require("discord-rpc");
const ClientID = '456826241933377539'; 
const snekfetch = require("snekfetch");
const rpc = new DiscordRPC.Client({ transport: 'ipc' }); 
const startTimestamp = new Date(); 

//временно отключено
//токен с VimeWorld, получить: /api - на сервере
//const apiToken = "ВАШ ТОКЕН"; 



//консруктор RPC
rpc.on('ready', () => {

    const url = 'http://api.vime.world/user/2760573/session'; //можно заменить на свою ссылку
    
    setInterval(function () { 

        snekfetch.get(url).then((r) => r.body).then((obj) => { 
            console.log(obj); 

            rpc.setActivity({
                details: `${obj.online.message}`, 
                state: `[${obj.user.rank}] ${obj.user.username}, ${obj.user.level}-й уровень, гильдия - ${obj.user.guild.name}`,
                startTimestamp,

                largeImageKey: `cat`,
                largeImageText: `Привет!`,

                smallImageKey: `smile`,
                smallImageText: `Я люблю САЛО`
        });
    });//
    }, 15000);
    //интервал, НЕЛЬЗЯ СТАВИТЬ МЕНЬШЕ 10000!
});

rpc.login(ClientID).catch(console.error);