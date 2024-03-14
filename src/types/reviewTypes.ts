import { UserWithProfile } from "./userTypes"

export type ReviewBody = {
    title: string
    body: string
    rating: number
}

export type Review = ReviewBody & {
    id: string,
    createdAt: string,
    user: UserWithProfile
}