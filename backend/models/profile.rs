use crate::diesel::*;
use crate::schema::*;

use crate::models::{PaginationParams, ID, UTC};
use crate::DB;
use diesel::QueryResult;
use serde::{Deserialize, Serialize};

#[tsync::tsync]
#[derive(
    Debug,
    Serialize,
    Deserialize,
    Clone,
    Queryable,
    Insertable,
    Identifiable,
    Associations,
    AsChangeset,
)]
#[table_name = "profiles"]
pub struct Profile {
    /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    Add columns here in the same order as the schema
    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
    pub id: ID,
    pub user_id: ID,
    pub first_name: String,
    pub last_name: String,
    pub email: String,
}

#[tsync::tsync]
#[derive(Debug, Serialize, Deserialize, Clone, Insertable, AsChangeset)]
#[table_name = "profiles"]
pub struct ProfileChangeset {
    /* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    Add columns here in the same order as the schema
    Don't include non-mutable columns
    (ex: id, created_at/updated_at)
    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
    pub user_id: ID,
    pub first_name: String,
    pub last_name: String,
    pub email: String,
}

impl Profile {
    pub fn create(db: &DB, item: &ProfileChangeset) -> QueryResult<Self> {
        use crate::schema::profiles::dsl::*;

        insert_into(profiles).values(item).get_result::<Profile>(db)
    }

    pub fn read(db: &DB, item_id: ID) -> QueryResult<Self> {
        use crate::schema::profiles::dsl::*;

        profiles.filter(id.eq(item_id)).first::<Profile>(db)
    }

    pub fn find_by_email(db: &DB, item_email: String) -> QueryResult<Self> {
        use crate::schema::profiles::dsl::*;

        profiles.filter(email.eq(item_email)).first::<Profile>(db)
    }

    pub fn read_all(db: &DB, pagination: &PaginationParams) -> QueryResult<Vec<Self>> {
        use crate::schema::profiles::dsl::*;

        profiles
            .order(last_name)
            .limit(pagination.page_size)
            .offset(
                pagination.page
                    * std::cmp::max(pagination.page_size, PaginationParams::MAX_PAGE_SIZE as i64),
            )
            .load::<Profile>(db)
    }

    pub fn update(db: &DB, item_id: ID, item: &ProfileChangeset) -> QueryResult<Self> {
        use crate::schema::profiles::dsl::*;

        diesel::update(profiles.filter(id.eq(item_id)))
            .set(item)
            .get_result(db)
    }

    pub fn delete(db: &DB, item_id: ID) -> QueryResult<usize> {
        use crate::schema::profiles::dsl::*;

        diesel::delete(profiles.filter(id.eq(item_id))).execute(db)
    }
}
