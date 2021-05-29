const Discord = require('discord.js');
const client = new Discord.Client;

//importamos los archibos que contienen (TOKEN,prefix,etc)
const config = require('../config.json')
//datos que seran usados para responder a las peticiones (.dia,.mme,etc)
const dataBase = require('./datos/base_datos.json')
//importamos el token del bot en la constante token
const TOKEN = config.Bot.TOKEN

//iniciamos el bot
client.on(`ready`, () => {
    //enviamos un pensaje por consola
    //para confirmar el inicio del bot
    console.log(`I am ready ⟶  |${client.user.tag}|`)
});

client.on(`message`, msg => {
    //definimos una const
    //que contrendra la informacion sobre si el mensage ha sido enviado,
    //por un bot o por un usuario 
    const issuerType = msg.author.bot
    //si la constante debuelve un valor "true" no se ejecutara ningun tipo de codigo
    //en caso de ser "false" significara que el mensaje asido en viado por un usuario
    //por lo que sera analizado para saver si es un comando o no lo es
    if(!issuerType){start(msg)}
});

function start(message) {
    //extraemos el prefijo del mesange recivido
    const message_Prefix = message.content.charAt(0);
    //extraemos el comando recivido
    let message_Command = message.content.charAt(1) + message.content.charAt(2) + message.content.charAt(3);
    //pasamos todos los caracteres del comando esxtraido a minuscula
    message_Command = message_Command.toLowerCase();

    //prefijos usados para introducir comandos en el bot
    const prefix_Bot = {
        '.': () => dot_Command(message_Command,message),
        '$': () => $_Command(message_Command)
    }

    //comprobamos si existe el prefijo recivido
    const prefix = prefix_Bot[message_Prefix]
        ?prefix_Bot[message_Prefix]()
        :undefined

    //devolvemos el comando si el prefijo no es undefined
    if(prefix !== undefined){message.reply(prefix)}
}

function dot_Command(message_Command, message) {
    //creamos un arry con los comando y la funcion que realizan
    const command_Bot = {
        'fin': () => dataBase.clase.lectivo.finally,
        'aul': () => dataBase.clase.Aules.Login,
        'mme': () => dataBase.clase.MME.drive_Carpet,
        'dia': () => {
            setTimeout(() => message.reply( dataBase.embed.dia[2] ), 200);
            setTimeout(() => message.reply( dataBase.embed.dia[1] ), 400);
        }
    }
    //comprovamos si el mensaje introducido es algun comando array(command_Bot) 
    let command = command_Bot[message_Command]
    //si exites se ejecuta la funcion asignada
    ?command_Bot[message_Command]()
    //si no existe se le asigna el valor null
    :1010

    //dia a comprobar
    const command_Dia = message.content.charAt(1) + message.content.charAt(2)
    //creamos un arry con los meses dela año que queramos
    const command_Fecha = {
        abr:() => dataBase.clase.lectivo.abril.includes(command_Dia), 
        may:() => dataBase.clase.lectivo.mayo.includes(command_Dia),
        jun:() => dataBase.clase.lectivo.junio.includes(command_Dia),
    }
    //comprovamos si el mensaje introducido es algun comando array(command_Fecha) 
    if (command === 1010) {
        //capturamos los tres primeros aracteres de la fecha introducida
        let fecha_message = message.content.charAt(4) + message.content.charAt(5) + message.content.charAt(6)
        //pasamos la variable a minuscula para que no hallan problemas al introducir los comandos
        fecha_message = fecha_message.toLowerCase()

        //comprobamos si existe el mes introducido
        command = command_Fecha[fecha_message]
        //si exites se ejecuta la funcion asignada
        ?command_Fecha[fecha_message]()
        //si no existe se le asigna el valor undefined
        :undefined
    }
    //retorna el valor que tiene el comando
    return command
}

function $_Command(message_Command) {
    //creamos un arry con los comando y la funcion que realizan
    const command_Bot = {
        com: dataBase.embed.command,
        lin: 'link BOT'
    }
    //comprovamos si el mensaje introducido es algun comando 
    const command = command_Bot[message_Command]
    //    ?command_Bot[message_Command]()
    //    :undefined
    //retorna el valor que tiene el comando
    return command
}

client.login(TOKEN)