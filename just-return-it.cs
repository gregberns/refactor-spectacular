class SomeClass {
  protected IPackets CreateTransaction(object request) {
    IPackets oPacket = new IPackets
    {
        xipayvbresult = false,
        packets = new ITransactionHeader[1]
    };
    oPacket.count = oPacket.packets.Length;

    ITransactionHeader header = TinyMapper.Map<ITransactionHeader>(request);
    oPacket.packets[0] = header;
    return oPacket;
  }
}

class SomeClassModified {
  protected IPackets CreateTransaction(object request)
  {
    return new IPackets
    {
      xipayvbresult = false,
      count = 1,
      packets = new [] { TinyMapper.Map<ITransactionHeader>(request) },
    };
  }
}
