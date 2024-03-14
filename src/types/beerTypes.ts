import { UserIdAndNick } from "./userTypes"

export type BeerBody = {
    name: string
    brewery: string
    type: string
    abv: number
    volume: number
    image?: string
}

export type Beer = BeerBody & {
    id: string
    createdAt: string
    creatorId: string
    viewsCount: number
    favouriteInUsers: UserIdAndNick[]
}

export type SearchBeerResult = Omit<BeerBody, 'brewery' | 'type' | 'abv' | 'volume'> & {
    id: string
}

export type EditedBeerBody = Partial<BeerBody> & Pick<Beer, 'id'>

export type BeerInputData = Omit<BeerBody, 'image'>