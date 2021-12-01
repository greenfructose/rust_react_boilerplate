use crate::diesel::*;
use crate::schema::*;
use crate::Pool;
use actix_web::{delete, get, post, put, Error};
use actix_web::{web, HttpResponse};
use serde::{Deserialize, Serialize};
use crate::models::profile::Profile;


#[get("/{id}")]
async fn read(
    pool: web::Data<Pool>,
    web::Path(item_id): web::Path<i32>,
) -> Result<HttpResponse, Error> {
    let db = pool.get().unwrap();

    use crate::schema::profiles::dsl::*;
    let result = profiles.filter(user_id.eq(item_id)).first::<Profile>(&db);

    Ok(result
        .map(|item| HttpResponse::Ok().json(item))
        .map_err(|_| HttpResponse::NotFound())?)
}