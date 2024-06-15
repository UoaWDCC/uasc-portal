import FirestoreCollections from "data-layer/adapters/FirestoreCollections"
import { BookingSlot } from "data-layer/models/firebase"
import { Timestamp } from "firebase-admin/firestore"
import { DocumentDataWithUid } from "data-layer/models/common"

export default class BookingSlotService {
  // Create
  public async createBookingSlot(bookingSlotData: BookingSlot) {
    return await FirestoreCollections.bookingSlots.add(bookingSlotData)
  }

  /**
   * Fetches a full booking slot ID, given the document ID.
   * @param id The id of the booking slot ID to retrieve.
   */
  public async getBookingSlotById(
    id: string
  ): Promise<DocumentDataWithUid<BookingSlot>> {
    const result = await FirestoreCollections.bookingSlots.doc(id).get()

    return { ...result.data(), id: result.id }
  }

  public async getBookingSlotByDate(
    date: Timestamp
  ): Promise<Array<DocumentDataWithUid<BookingSlot>>> {
    const result = await FirestoreCollections.bookingSlots
      .where("date", "==", date)
      .get()
    const bookingSlotArray = result.docs.map((docs) => {
      return { ...docs.data(), id: docs.id }
    })
    return bookingSlotArray
  }

  public async getBookingSlotsBetweenDateRange(
    startDate: Timestamp,
    endDate: Timestamp
  ): Promise<Array<DocumentDataWithUid<BookingSlot>>> {
    const result = await FirestoreCollections.bookingSlots
      .where("date", ">=", startDate)
      .where("date", "<=", endDate)
      .get()
    const bookingSlotArray = result.docs.map((docs) => {
      return { ...docs.data(), id: docs.id }
    })
    return bookingSlotArray
  }

  // Update
  public async updateBookingSlot(
    bookingSlotId: string,
    bookingSlotData: Partial<BookingSlot>
  ) {
    return await FirestoreCollections.bookingSlots
      .doc(bookingSlotId)
      .update(bookingSlotData)
  }

  // Delete
  public async deleteBookingSlot(bookingSlotId: string) {
    return await FirestoreCollections.bookingSlots.doc(bookingSlotId).delete()
  }
}
