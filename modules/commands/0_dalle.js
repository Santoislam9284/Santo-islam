const axios = require('axios');
const fs = require('fs-extra');
module.exports.config = {
    name: "dalle",
    version: "1.0",
    credits: "dipto",
    hasPermssion: 0,
    usePrefix: true,
    description: "Generate images by Dalle-3 AI",
    commandCategory: "download",
    usages: "[text] \nJamon [A 17/18/19 years old boy/girl watching football match on tv and written Dipto and 69 on the back of his Dress , 4k]",
    cooldowns: 5
  };

module.exports.run = async function ({ api, event, args }) {
  const prompt = event.messageReply?.body.split("dalle")[1] ||  args.join(" ");
  if (!prompt) {
   return api.sendMessage("❌| Wrong Formet /dalle a Attitude Boy , 4k",event.threadID,event.messageID);
  }
    try {
      //const cookies = "1Bd3qcEiBerCDFBXrH1iTwmqzCJ7LaAJLYv6M9EeV5Mb_6EG0LOgm0zgdpAUQIWjkKZnoMucnxWfgH1YZdfF2WLAa6XOdxy2laGsPll_k2Jb8ei-Wz6SY4surao2vuiS06BLUDuav02beDHN1maeyE0X-EmApdwO0ujdhFV7bHsk9LzD6Iy4vKji5kWhwZ-qHA_xdQ_iwzz9KOt4Y5Wz75ik-MKdpsvYtzYkat6vGCwo";
const tl = ["1wQYb6QO_YEcpZkpwXlZsJnlbefaoaW-wV0Zl8JS32-sV_BjG7nhAXWmuOs9q2frx_kOLE4z4d2cmo67cXmMhnII_JKtrv5PeQq3nmS5IRrXnQq136y7apiHleMsEsYUm-x_dl2uvgo266VbCnhKNNw9OwnpawyOJrRxnzujpVhjQqoyF1iEXpYiZVBH2phOhmWGgyoguUZIOSClfDpVWJTl5VbXIXlL_9FNN_SpxbA0","1Bd3qcEiBerCDFBXrH1iTwmqzCJ7LaAJLYv6M9EeV5Mb_6EG0LOgm0zgdpAUQIWjkKZnoMucnxWfgH1YZdfF2WLAa6XOdxy2laGsPll_k2Jb8ei-Wz6SY4surao2vuiS06BLUDuav02beDHN1maeyE0X-EmApdwO0ujdhFV7bHsk9LzD6Iy4vKji5kWhwZ-qHA_xdQ_iwzz9KOt4Y5Wz75ik-MKdpsvYtzYkat6vGCwo"];
const cookies = tl[Math.floor(Math.random() * tl.length)];
      const w = await api.sendMessage("𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐏𝐫𝐨𝐜𝐞𝐬𝐬𝐢𝐧𝐠 𝐘𝐨𝐮𝐫 𝐈𝐦𝐚𝐠𝐞", event.threadID);
  
const response = await axios.get(`https://noobs-api.onrender.com/dipto/dalle?prompt=${prompt}&key=dipto008&cookie=${cookies}`)
      const data = response.data.imgUrls;
      if (!data || data.length === 0) {
        api.sendMessage("No images generated.",event.threadID,event.messageID);
      }
      const diptoo = [];
      for (let i = 0; i < data.length; i++) {
        const imgUrl = data[i];
        const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        const imgPath = __dirname + `/cache/${i + 1}.jpg`;
        await fs.outputFile(imgPath, imgResponse.data);
        diptoo.push(fs.createReadStream(imgPath));
      }
      await api.unsendMessage(w.messageID);
      await api.sendMessage({
  body: `𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥 𝐂𝐫𝐞𝐚𝐭𝐞𝐝 𝐘𝐨𝐮𝐫 𝐈𝐦𝐚𝐠𝐞 𝐁𝐲 𝐍𝐚𝐳𝐫𝐮𝐥 𝐏𝐫𝐨𝐣𝐞𝐜𝐭`,
        attachment: diptoo
      },event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      await api.sendMessage(`Generation failed!\nError: ${error.message}`,event.threadID, event.messageID);
    }
  };
