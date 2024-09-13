import { createConnection } from "typeorm";

export const databaseConfig = async () => {
  const entities = [__dirname + "/entity/*.*"];
  await createConnection({
    type: "mysql",
    host: "printing.ct7gl04hlpci.ap-northeast-2.rds.amazonaws.com",
    port: 3306,
    username: "admin",
    password: "eO5VXRgURr3Udlla5EPu",
    database: "printing",
    entities: entities,
    synchronize: true,
    timezone: "Z",
  });
};
