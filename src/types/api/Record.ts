export class Record{
  readonly id!: string;
  readonly title!: string;
  readonly time!: number;
  readonly created_at!: Date;


  constructor(init?: Partial<Record>){
    Object.assign(this, init);
  };
};