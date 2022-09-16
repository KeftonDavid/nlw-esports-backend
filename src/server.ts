import express from 'express';
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors())

const prisma = new PrismaClient({
    log: ['query']
});
const PORT = 3333;



app.get("/games", async (req, res) => {
    const games = await prisma.game.findMany({
        include:{
            _count:{
                select:{
                    ads: true
                }
            }
        }
    })
    res.json(games);
})

app.post("/games/:id/ads", async(req, res) => {
    const gameId = req.params.id;
    const body = req.body;


    const ad = await prisma.ad.create({
        data:{
            gameId,
            name: body.name,
            yearsPlaying:  body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hoursStart: convertHourStringToMinutes(body.hoursStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    })

    res.status(201).json([ad]);
})


app.get("/games/:id/ads", async (req, res) => {
    
    const gameId = req.params.id
    const ads = await prisma.ad.findMany({
        select:{
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hoursStart: true,
            hourEnd: true,
        },
        where:{
            gameId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    
    return res.json([ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hoursStart: convertMinutesToHourString(ad.hoursStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd)
        }
    })])
})

app.get("/ads/:id/discord", async(req, res) => {
    
    const adId = req.params.id
    
    const ad = await prisma.ad.findUniqueOrThrow({
        select:{
            discord: true,
        },
        where: {
            id: adId
        }
    })


    return res.json({
        discord: ad.discord,
    })
})


app.listen(PORT, ()=> {
    console.log(`Servidor rodando na porta ${PORT}`);
});