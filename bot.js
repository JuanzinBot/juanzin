import discord
import asyncio
import random
import time
import datetime


client = discord.Client()

players = {}
COR = 0xF7FE2E

@client.event
async def on_ready():
    print('Juanzin Voltou')
    print(client.user.name)
    print(client.user.id)
    print('---Juanzin----')


@client.event
async def on_message(message):
    if message.content.lower().startswith('j?juanzin'):
        await client.send_message(message.channel, "Olá, meu nome é Juanzin e eu sou um bot aleatorio no Discord")

    if message.content.lower().startswith("j?ajuda"):
        user = message.author.name
        horario = datetime.datetime.now().strftime("%H:%M:%S")
        embe = discord.Embed()
        embe = discord.Embed(title="Ajuda Sobre O Bot", description="Juanzin", color=0x690FC3)
        embe.add_field(name="Sou um Bot Feito Pelo SrSt0n3#9666", value="Sou um bot .py", inline=True)
        embe.add_field(name="Meus Comandos", value="My Commands =D", inline=True)
        embe.add_field(name="Cara ou coroua: j?moeda", value=" j?moeda",
                       inline=True)
        embe.add_field(name="Para saber as informações do server", value=" j?serverinfo",
                       inline=True)
        embe.add_field(name="Para saber seu ping:", value=" j?ping",
                       inline=True)
        embe.add_field(name="Para saber as informações de alguem ",
                       value="j?userinfo @SrSt0n3#9666", inline=False)
        embe.add_field(name="Para banir alguem ",
                       value="j?ban @SrSt0n3#9666 motivo", inline=False)
        embe.add_field(name="Para o bot falar algo",
                       value="j?say msg", inline=False)
        embe.add_field(name="Para sortear alguem aleatorio online:",
                       value="j?sorteio", inline=False)
        embe.add_field(name="Para apagar as msg do canal",
                       value="j?apagar Quantidade", inline=False)
        embe.set_footer(text="Comando requisitado por {} as {}!".format(user, horario))
        await client.send_message(message.channel, embed=embe)

        if message.content.lower().startswith('j?say'):
            if message.author.server_permissions.administrator:
                try:
                    msg = str(message.content).replace("j?say", "")
                    embed = discord.Embed(description=msg, color=0xFF8000)
                    await client.send_message(message.channel, embed=embed)
                    await client.delete_message(message)
                except:
                    await  client.send_message(message.channel, "Digite algo!")
            else:
                await client.send_message(message.channel, "Sem permissão!")

    if message.content.lower().startswith('j?anunciar'):
        if message.author.server_permissions.administrator:
            try:
                msg = str(message.content).replace("j?advertisement", "")
                embed = discord.Embed(title="🔊 Anúncio! 🔊", description=msg, color=0x0b4b47)
                await client.send_message(message.channel, embed=embed)
                await client.delete_message(message)
            except IndexError:
                await client.send_message(message.channel, "Digite algo para um anúncio!")
        else:
            await client.send_message(message.channel, "***Você não tem permissão para usar esse comando!***")

    if message.content.lower().startswith('j?moeda'):
            escolha = random.randint(1, 2)
            if escolha == 1:
                await client.add_reaction(message, '😀')
            if escolha == 2:
                await client.add_reaction(message, '👑')

    if message.content.lower().startswith('j?ping'):
           channel = message.channel
           t1 = time.perf_counter()
           await client.send_typing(channel)
           t2 = time.perf_counter()
           ping_embed = discord.Embed(title="🏓 Pong!", color=0x000000, description='Meu tempo de resposta é `{}ms`!'.format(round((t2 - t1) * 1000)))
           await client.send_message(message.channel, f"{message.author.mention}", embed=ping_embed)

    if message.content.lower().startswith('j?userinfo'):
        try:
            user = message.mentions[0]
            server = message.server
            embedinfo = discord.Embed(title='-=Info Do Usuario=-', color=0x03c3f5, )
            embedinfo.set_thumbnail(url=user.avatar_url)
            embedinfo.add_field(name='Usuário:', value=user.name)
            embedinfo.add_field(name='Apelido', value=user.nick)
            embedinfo.add_field(name='🆔 ID:', value=user.id)
            embedinfo.add_field(name='📅 Entrou em:', value=user.joined_at.strftime("%d %b %Y às %H:%M"))
            embedinfo.add_field(name='📅 Server criado em:', value=server.created_at.strftime("%d %b %Y %H:%M"))
            embedinfo.add_field(name='Jogando:', value=user.game)
            embedinfo.add_field(name="Status:", value=user.status)
            embedinfo.add_field(name='Cargos:', value=([role.name for role in user.roles if role.name != "@everyone"]))
            await client.send_message(message.channel, embed=embedinfo)
        except ImportError: 
            await client.send_message(message.channel, 'Buguei!')
        except:
            await client.send_message(message.channel, '❎ | Mencione um usuário válido!')
        finally:
            pass

    if message.content.startswith('j?serverinfo'):
        user = message.author.name

        horario = datetime.datetime.now().strftime("%H:%M:%S")

        serverinfo_embed = discord.Embed(title="\n", description="Abaixo está as informaçoes principais do servidor!",
                                         color=COR)
        serverinfo_embed.set_thumbnail(url=message.server.icon_url)
        serverinfo_embed.set_footer(text="{} • {}".format(user, horario))
        serverinfo_embed.add_field(name="Nome:", value=message.server.name, inline=True)
        serverinfo_embed.add_field(name="Dono:", value=message.server.owner.mention)
        serverinfo_embed.add_field(name="ID:", value=message.server.id, inline=True)
        serverinfo_embed.add_field(name="Cargos:", value=len(message.server.roles), inline=True)
        serverinfo_embed.add_field(name="Canais de texto:", value=len(
            [message.channel.mention for channel in message.server.channels if
             channel.type == discord.ChannelType.text]),
                                   inline=True)
        serverinfo_embed.add_field(name="Canais de voz:", value=len(
            [message.channel.mention for channel in message.server.channels if
             channel.type == discord.ChannelType.voice]),
                                   inline=True)
        serverinfo_embed.add_field(name="Membros:", value=len(message.server.members), inline=True)
        serverinfo_embed.add_field(name="Bots:",
                                   value=len([user.mention for user in message.server.members if user.bot]),
                                   inline=True)
        serverinfo_embed.add_field(name="Criado em:", value=message.server.created_at.strftime("%d %b %Y %H:%M"),
                                   inline=True)
        serverinfo_embed.add_field(name="Região:", value=str(message.server.region).title(), inline=True)

        await client.send_message(message.channel, embed=serverinfo_embed)
    if message.content.startswith("j?ban"):
        if not message.author.server_permissions.ban_members:
            return await client.send_message(message.channel,
                                             "**Você não tem permissão para executar esse comando bobinho(a)!**")
        try:
            user = message.mentions[0]
            await client.send_message(message.channel,
                                      "**O usuario(a) <@{}> foi banido com sucesso do servidor.**".format(user.id))
            await client.ban(user, delete_message_days=1)
        except:
            await client.send_message(message.channel, "**Você deve especificar um usuario para banir!**")
        finally:
            pass

    if message.content.lower().startswith('j?say'):
        if message.author.server_permissions.administrator:
            try:
                msg = str(message.content).replace("j?say", "")
                embed = discord.Embed(description=msg, color=0xFF8000)
                await client.send_message(message.channel, embed=embed)
                await client.delete_message(message)
            except:
                await  client.send_message(message.channel, "Digite algo!")
        else:
            await client.send_message(message.channel, "Sem permissão!")

    if message.content.lower().startswith("j?sorteio"):  # esse comandos sorteia um memebro
        if message.author.server_permissions.administrator:
            n = random.choice(list(message.server.members))
            n1 = '{}'.format(n.name)
            m1 = discord.utils.get(message.server.members, name="{}".format(n1))
            embed = discord.Embed(
                title="Sorteiar membro",
                colour=0xab00fd,
                description="Membro sorteado foi {}".format(m1.mention)
            )
            hh = await client.send_message(message.channel, "{}".format(m1.mention))
            await client.delete_message(hh)
            await client.send_message(message.channel, embed=embed)
        else:
            await client.send_message(
                "{} você não tem permissão de executar esse comando!".format(message.author.mention))

    if message.content.lower().startswith('j?apagar'):
        if not message.author.server_permissions.manage_messages:
            return await client.send_message(message.channel,
                                             "**Você não tem permissão para executar esse comando SATANÁS!!! !**")
        try:
            limite = int(message.content[9:]) + 1
            await client.purge_from(message.channel, limit=limite)
            await client.send_message(message.channel, '{} mensagens foram deletadas por {}'.format(limite,
                                                                                                                 message.author.mention))
        except:
            await client.send_message(message.channel, 'Eu não tenho permissão para apagar mensagens nesse servidor.')

    if message.content.startswith('j?reportar'):
        await client.send_message(message.author,
                                  '**Qual úsuario você deseja denunciar? {}**'.format(message.author.mention))
        jogador = await client.wait_for_message(author=message.author)
        await client.send_message(message.author, '**Qual o motivo da denuncia? {}**'.format(message.author.mention))
        motivo = await client.wait_for_message(author=message.author)
        await client.send_message(message.author, '**Que dia aconteceu isso? {}**'.format(message.author.mention))
        dia = await client.wait_for_message(author=message.author)
        await  client.send_message(message.author, '**Prova já hospedada senhor {}:**'.format(message.author.mention))
        prova = await client.wait_for_message(author=message.author)
        canal = client.get_channel('480839791588540416')
        embed = discord.Embed(colour=0xF0000,
                              description="O Úsuario: {} acabou de denunciar!".format(message.author.mention))
        embed.add_field(name='✏Motivo:', value=motivo.content)
        embed.add_field(name='📅Data do ocorrido:', value=dia.content)
        embed.add_field(name='👤Úsuario denunciado:', value=jogador.content)
        await client.send_message(canal, embed=embed)

@client.event
async def on_ready():
    while True:
       messagem = "★ Juanzin está online em "+str(len(client.servers))+" servidores com "+str(len(set(client.get_all_members())))+" membros! ★"
       await client.change_presence(game=discord.Game(name=messagem, type=1, url='https://www.twitch.tv/'),status='streaming')
       await asyncio.sleep(30)
       messagem = "★ Eu sou um bot criado pelo SrSt0n3#9666 Um jovem que sonha ser programador ★"
       await client.change_presence(game=discord.Game(name=messagem, type=1, url='https://www.twitch.tv/'),status='streaming')
       await asyncio.sleep(30)
       messagem = "★ Você precisa de ajuda sobre mim? Digite j?ajuda para ver meus comandos! ★"
       await client.change_presence(game=discord.Game(name=messagem, type=1, url='https://www.twitch.tv/'),status='streaming')


client.login(process.env.NDgwMTM1MzY4NTU4MTE2ODY1.DljduQ.KmTrmMtrw8BytRmbO2lpBc5k-iI);
