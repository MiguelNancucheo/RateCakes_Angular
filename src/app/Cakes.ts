export interface comment {
  _id: string,
  rate: number,
  comment: string
}

export interface Cake {
  _id: string,
  name: string,
  url: string,
  comments: [comment]
}
