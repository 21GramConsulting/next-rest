import {Codec, json} from '@21gram-consulting/ts-codec';
import {Identifiable} from '#Identifiable';

export type Model = Identifiable<string> & {
  nickname: string;
  score: number;
  active: boolean;
  log: Array<{
    date: Date;
    message: string;
  }>;
};

export const codec: Codec<Model> = json.record({
  nickname: json.string,
  score: json.number,
  active: json.boolean,
  log: json.array(
    json.record({
      date: json.date,
      message: json.string,
    })
  ),
});

export const model: Model = {
  nickname: 'test',
  score: 0,
  active: true,
  log: [
    {
      date: new Date(),
      message: 'test',
    },
  ],
};
