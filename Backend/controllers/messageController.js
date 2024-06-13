import Conversation from "../model/conversationModel.js";
import Message from "../model/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiveId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiveId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiveId],
      });
    }

    const newMessage = new Message({
      senderId: senderId,
      receiveId: receiveId,
      message: message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    //Socket.io is here

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userChatId } = req.params; //get the person'id need to get message transmit messageRoutes
    const senderId = req.user._id; //get the person's id login

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessage controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
